import re
import sys
import nltk

# Install NLTK data if not already installed
nltk.download('words', quiet=True)

from nltk.corpus import words

# Paths to your files
TEXT_FILE_PATH = 'C:\\Users\\Rituraj\\Downloads\\WhatsApp Chat with Aneilia Simpson.txt'        # Replace with your text file path
OUTPUT_FILE_PATH = 'clean_five_letter_words.txt'

def load_valid_words():
    # Load words from NLTK corpus and filter five-letter words
    valid_words = set(word.lower() for word in words.words() if len(word) == 5)
    return valid_words

def extract_words_from_text(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            text = file.read().lower()
        # Use regex to extract words
        words_in_text = re.findall(r'\b[a-z]{5}\b', text)
        return words_in_text
    except FileNotFoundError:
        print(f"Error: Text file not found at '{file_path}'.")
        sys.exit(1)

def process_words():
    # Load valid five-letter words from NLTK corpus
    valid_words = load_valid_words()
    print(f"Loaded {len(valid_words)} valid five-letter words from NLTK corpus.")

    # Extract words from your text file
    extracted_words = extract_words_from_text(TEXT_FILE_PATH)
    print(f"Extracted {len(extracted_words)} five-letter words from the text file.")

    # Filter out typos by keeping only valid words
    cleaned_words = [word for word in extracted_words if word in valid_words]
    print(f"After filtering, {len(cleaned_words)} valid words remain.")

    # Remove duplicates and sort
    cleaned_words = sorted(set(cleaned_words))
    print(f"Final list contains {len(cleaned_words)} unique words.")

    # Save the cleaned word list
    try:
        with open(OUTPUT_FILE_PATH, 'w', encoding='utf-8') as file:
            for word in cleaned_words:
                file.write(f"{word}\n")
        print(f"Cleaned word list saved to '{OUTPUT_FILE_PATH}'.")
    except IOError as e:
        print(f"Error writing to output file: {e}")
        sys.exit(1)

if __name__ == "__main__":
    process_words()