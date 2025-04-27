

API_KEY = "AIzaSyBdc2_cVuSgGXyoTbVNPnrOcY4ooeZAG1c"  # Replace with Gemini or OpenAI key

import google.generativeai as genai

# Replace with your actual API key
genai.configure(api_key="AIzaSyBdc2_cVuSgGXyoTbVNPnrOcY4ooeZAG1c")

# Load the Gemini model
model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

# Example prompt
prompt = "If the item is a food use all the nutritional information extracted form the open source food database and list pros and cons of taking the food. However if the item is a medicine or drug read the drug database and provide a quick description of it and feedback of what drugs/medicine and foods you shouldn't take with the medication you are taking."

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



