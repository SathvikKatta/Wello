import requests

# Converts from Barcode to an actual product

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









