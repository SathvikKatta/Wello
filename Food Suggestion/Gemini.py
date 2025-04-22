

API_KEY = "AIzaSyBz7vzeI6jvS28Lh8LXUb8JJlSadjOoMTQ"  # Replace with Gemini or OpenAI key

import google.generativeai as genai

# Replace with your actual API key
genai.configure(api_key="AIzaSyBz7vzeI6jvS28Lh8LXUb8JJlSadjOoMTQ")

# Load the Gemini model
model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

# Example prompt
prompt = "Give me 3 spicy vegetarian dinner ideas with ingredients"

# Generate a response
response = model.generate_content(prompt)

# Print the generated content
print(response.text)

models = genai.list_models()
for model in models:
    print(model.name, model.supported_generation_methods)


