from flask import Flask, request, jsonify
import base64
from PIL import Image
from io import BytesIO
import pytesseract

# Set the path to the server Tesseract-OCR executable
# pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'

# Test script to check if the Tesseract-OCR is working
# print(pytesseract.image_to_string(Image.open('app\\routed_image.png')))

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json()
    image_data = data['image']
    image_data = image_data.split(',')[1]

    decoded_image = base64.b64decode(image_data)
    image = Image.open(BytesIO(decoded_image))

    print(pytesseract.image_to_string(image))

    return jsonify({'message': 'Label Received and Parsed'})

if __name__ == '__main__':
    app.run(debug=True)