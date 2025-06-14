import requests
import google.generativeai as genai
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# === CONFIGURATION ===
GEMINI_API_KEY = "AIzaSyBdc2_cVuSgGXyoTbVNPnrOcY4ooeZAG1c"
UPC_API_URL = "https://api.upcitemdb.com/prod/trial/lookup"
USDA_API_KEY = "GhkIxCiYKlUO2usa4lfiepZ7EFW1imkDNTxaO1Xv"

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")


def get_product_title_from_upc(upc_code):
    response = requests.get(f"{UPC_API_URL}?upc={upc_code.strip()}")
    if response.status_code == 200:
        data = response.json()
        if data["code"] == "OK" and len(data["items"]) > 0:
            return data["items"][0]["title"]
    return None


def get_nutrition_info(product_title, api_key):
    search_url = "https://api.nal.usda.gov/fdc/v1/foods/search"
    food_url = "https://api.nal.usda.gov/fdc/v1/food/{}"

    params = {
        "query": product_title,
        "dataType": ["Foundation", "SR Legacy"],
        "pageSize": 1,
        "api_key": api_key
    }

    response = requests.get(search_url, params=params)
    results = response.json()

    if not results.get("foods"):
        return None

    fdc_id = results["foods"][0]["fdcId"]
    title = results["foods"][0].get("description", "N/A")
    brand = results["foods"][0].get("brandOwner", "N/A")

    detail_url = food_url.format(fdc_id)
    detail_response = requests.get(detail_url, params={"api_key": api_key})
    nutrition_data = detail_response.json()

    output = f"Food Title: {title}\nBrand: {brand}\n\n=== Nutritional Info (per 100g) ===\n"
    for nutrient in nutrition_data.get("foodNutrients", []):
        name = nutrient.get("nutrient", {}).get("name", "")
        amount = nutrient.get("amount")
        unit = nutrient.get("nutrient", {}).get("unitName", "")
        if amount is not None:
            output += f"{name}: {amount} {unit}\n"

    return output.strip()


def get_medicine_info(brand_name):
    def query_fda(name):
        url = "https://api.fda.gov/drug/label.json"
        params = {
            "search": f"openfda.brand_name:{name}",
            "limit": 1
        }
    
        return requests.get(url, params = params)
    
    response = query_fda(brand_name)

    if response.status_code != 200 or "results" not in response.json():
        simple_name = brand_name.split()[0]
        print(f"🔁 Retrying with simplified name: {simple_name}")
        response = query_fda(simple_name)

    if response.status_code == 200:
        data = response.json()
        if "results" in data:

            med = data["results"][0]
            output = f"🩺 Brand: {brand_name}\n"
            output += "Active Ingredients: " + ", ".join(med.get("active_ingredient", ["N/A"])) + "\n"
            output += "Inactive Ingredients: " + ", ".join(med.get("inactive_ingredient", ["N/A"])) + "\n"
            output += "Purpose: " + "; ".join(med.get("purpose", ["N/A"])) + "\n"
            output += "Usage: " + "; ".join(med.get("indications_and_usage", ["N/A"])) + "\n"
            output += "Warnings: " + "; ".join(med.get("warnings", ["N/A"]))
            return output.strip()
        
    if "results"  not in data:
        return None


def analyze_with_gemini(info_text, is_food=True):
    if is_food:
        prompt = ( 
            f"Given the following product and its nutritional information, "
            f"list 3 pros and 3 cons of eating it. Also give a short summary phrase. The pros should be formatted like **Pros of [product_name]**, and then list the pros. The cons should be formatted like **Cons of [product_name]**, and then list the cons \n{info_text}" 
            )
        rating = f"Given the following product and its nutrition infomation. Write a short phase like, 'Looks Good', 'Be Cautious', etc. and rate it out of 5: Output the number first.\n{info_text}"
    else:
        prompt = (
            f"Based on this medicine label, give a short summary, mention which foods or drugs "
            f"should not be taken with it, and also provide a short phrase (like 'Safe', 'Use with caution') The pros should be formatted like **Pros of [product_name]**, and then list the pros. The cons should be formatted like **Cons of [product_name]**, and then list the cons and list thing you shouldn't take with the medicine\n{info_text}"
        )
        rating = f"Given the following medicine and its nutrition infomation. Write a short phase like, 'like Safe', 'Use with caution', etc. and rate it out of 5: Output the number first.\n{info_text}"


    response = model.generate_content(prompt)
    rating = model.generate_content(rating)
    return response.text.strip(), rating.text.strip()



@app.route('/main', methods=['POST'])
def main_method():
    upc_code = request.json.get('input')
    print(f"🔎 Looking up UPC: {upc_code}")
    title = get_product_title_from_upc(upc_code)
    if not title:
        print("Product not found for this UPC.")
        return

    print(f"Product title found: {title}\n")

    nutrition_info = get_nutrition_info(title, USDA_API_KEY)
    if nutrition_info:
        print("Nutrition Info Found:\n", nutrition_info, "\n")
        analysis, rating = analyze_with_gemini(nutrition_info, is_food=True)
    else:
        print("Nutrition info not found. Checking medicine database...\n")
        medicine_info = get_medicine_info(title)
        if not medicine_info:
            print("No medicine info found either.")
            return
        print("Medicine Info Found:\n", medicine_info, "\n")
        analysis, rating = analyze_with_gemini(nutrition_info, is_food=True)

    print("\nAnalysis:\n")
    return jsonify({"product_title": title,
                    "nutrition_info": nutrition_info,
                    "analysis": analysis,
                    "rating": rating})

if __name__ == '__main__':
    app.run(debug=True)



# === RUN ===
# main("016000141544")  # Replace with any UPC code
