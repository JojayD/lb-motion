import tempfile
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import spacy

# Load environment variables and initialize services
load_dotenv(find_dotenv())
openai_api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=openai_api_key)

app = Flask(__name__)
CORS(app)
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2')
nlp = spacy.load("en_core_web_sm")

@app.route('/receive_text', methods=['POST'])
def give_score():
    print("Entered give_score")

    if not request.json or 'messages' not in request.json:
        return jsonify({"error": "No messages provided"}), 400
  
    messages = request.json.get('messages', [])
    
    print(f'These are the messages', messages)
    try:
        for message in messages:
            doc = nlp(message['content'])
            inputs = tokenizer(str(doc), return_tensors="pt")
            outputs = model(**inputs, labels=inputs["input_ids"])
            log_likelihood = outputs.loss.item()
            print(f"Message from {message['role']}: {message['content']}")
            print("Log likelihood: ", log_likelihood)

            completion = client.chat.completions.create(
                model="gpt-4o",  # Make sure to use the correct model identifier
                messages=[
                    {"role": "system",
                     "content": "You are a tutor for English that gives back feedback in Japanese. The format should be corrections first in the native language, then the correct way to say it in English."},
                    {"role": "user", "content": f"Please help me improve this sentence: {message['content']}"},
                ]
            )
            feedback = completion.choices[0].message
            print(f"Feedback: {feedback}")

        return jsonify({"status": "success", "message": "Messages processed"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
