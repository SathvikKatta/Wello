import requests

# Gets nutrional information after the product is already identified

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


# Check to see if the function works
get_nutrition_info("egg", "GhkIxCiYKlUO2usa4lfiepZ7EFW1imkDNTxaO1Xv")
