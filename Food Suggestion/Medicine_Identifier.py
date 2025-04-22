import requests

def get_medicine_info(brand_name):
    base_url = "https://api.fda.gov/drug/label.json"
    params = {
        "search": f"openfda.brand_name:{brand_name}",
        "limit": 1
    }

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        data = response.json()

        if "results" in data:
            med = data["results"][0]

            print(f"🩺 Brand: {brand_name}")
            print("Active Ingredients:", med.get("active_ingredient", ["N/A"]))
            print("Inactive Ingredients:", med.get("inactive_ingredient", ["N/A"]))
            print("Purpose:", med.get("purpose", ["N/A"]))
            print("Usage:", med.get("indications_and_usage", ["N/A"]))
            print("Warnings:", med.get("warnings", ["N/A"]))

        else:
            print("No results found for that medicine.")
    else:
        print("Failed to fetch data:", response.status_code)

# Check to see if the function works
get_medicine_info("TYLENOL")
