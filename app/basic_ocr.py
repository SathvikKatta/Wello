import pytesseract
pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'
from PIL import Image

print(pytesseract.image_to_string(Image.open('app\\received_image.png')))