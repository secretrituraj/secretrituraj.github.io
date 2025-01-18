import json

# Read the cleaned word list
with open('clean_five_letter_words.txt', 'r', encoding='utf-8') as file:
    words = [word.strip().lower() for word in file if word.strip()]

# Convert the list to a JSON array
words_js_content = f"const wordList = {json.dumps(words)};"

# Save to words.js
with open('words.js', 'w', encoding='utf-8') as js_file:
    js_file.write(words_js_content)

print("words.js has been created.")