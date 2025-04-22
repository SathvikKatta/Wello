import requests

# Define the base URL and endpoint
base_url = "https://api.upcitemdb.com/prod/trial/lookup"
upc_code = "016000141544 "  # Example UPC code

# Make the GET request
response = requests.get(f"{base_url}?upc={upc_code}")

# Check if the request was successful
if response.status_code == 200:
    data = response.json()  # Parse JSON response
    if data["code"] == "OK" and len(data["items"]) > 0:
        # Extract product info
        product = data["items"][0]
        Product_Title = product["title"]
        print("Product Title:", product["title"])
        print("Brand:", product["brand"])
        print("Description:", product["description"])
    else:
        print("No product found for this UPC.")
else:
    print(f"Error: {response.status_code} - {response.text}")




def get_nutrition_info(product_title, api_key):
    # Step 1: Search for the product in USDA FoodData Central
    search_url = "https://api.nal.usda.gov/fdc/v1/foods/search"
    food_url = "https://api.nal.usda.gov/fdc/v1/food/{}"

    params = {
        "query": product_title,
        "dataType": ["Foundation", "SR Legacy"],  # Only get well-documented foods
        "pageSize": 1,
        "api_key": api_key
    }
    
    response = requests.get(search_url, params=params)
    results = response.json()

    if not results.get("foods"):
        print("No foods found.")
        return

    fdc_id = results["foods"][0]["fdcId"]
    title = results["foods"][0].get("description", "N/A")
    brand = results["foods"][0].get("brandOwner", "N/A")

    # Step 2: Fetch detailed food data
    detail_url = food_url.format(fdc_id)
    detail_response = requests.get(detail_url, params={"api_key": api_key})
    nutrition_data = detail_response.json()

    # Step 3: Print info
    print(f"Food Title: {title}")
    print(f"Brand: {brand}\n")
    print("=== Nutritional Information for 100g of "+str(title) +"===")
    for nutrient in nutrition_data.get("foodNutrients", []):
        name = nutrient.get("nutrient", {}).get("name", "")
        amount = nutrient.get("amount")
        unit = nutrient.get("nutrient", {}).get("unitName", "")
        if amount is not None:
            print(f"{name}: {amount} {unit}")

    return title, nutrition_data

title, nutrition_data = get_nutrition_info(Product_Title, "GhkIxCiYKlUO2usa4lfiepZ7EFW1imkDNTxaO1Xv")

# Create a string to save everything
if title and nutrition_data:
    output_lines = [
        f"Product Title: {Product_Title}",
        f"Brand: {product.get('brand', 'N/A')}",
        f"Description: {product.get('description', 'N/A')}",
        f"\n=== Nutritional Information for 100g of {title} ==="
]

for nutrient in nutrition_data.get("foodNutrients", []):
    name = nutrient.get("nutrient", {}).get("name", "")
    amount = nutrient.get("amount")
    unit = nutrient.get("nutrient", {}).get("unitName", "")
    if amount is not None:
        output_lines.append(f"{name}: {amount} {unit}")

# Save to text file
with open("nutrition_output.txt", "w") as file:
    file.write("\n".join(output_lines))


# Gemini Integration

API_KEY = "AIzaSyBz7vzeI6jvS28Lh8LXUb8JJlSadjOoMTQ"  # Replace with Gemini or OpenAI key

import google.generativeai as genai

# Replace with your actual API key
genai.configure(api_key="AIzaSyBz7vzeI6jvS28Lh8LXUb8JJlSadjOoMTQ")

# Load the Gemini model
model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

# Example prompt
prompt = "Use all the nutritional information extracted form the open source food database and list pros and cons of taking the food. Here is the data + "

# Generate a response
response = model.generate_content(prompt)
# Print the generated content
print(response.text)

with open("nutrition_output.txt", "r") as file:
    content = file.read()

prompt = f"""
Given the following product and its nutritional information, list 3 pros and 3 cons of eating it:

{content}
"""

response = chat.send_message(prompt)
print(response.text.strip())




