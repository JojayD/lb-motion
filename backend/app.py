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
    language = request.json.get('language')
    print("Here is the language:",language)
    print(f'These are the messages', messages)
    list_of_messages = []
    try:
        for message in messages:
            if message['role'] == 'user':  # Only process user messages
                doc = nlp(message['content'])

                completion = client.chat.completions.create(
                    model="gpt-4o",  # Make sure to use the correct model identifier
                    messages=[
                        {"role": "system",
                         "content": "This assistant is designed to provide grammatical feedback and corrections for English sentences using the client's preferred language. It only explains the corrections in the user's preferred language to enhance understanding."},
                        {"role": "user", "content": f"Here's an English sentence: '{message['content']}'. Please provide grammatical corrections in {language} and explain the necessary changes in {language}. At the end of your feedback sentence, provide a rating for the grammatical correctness of the user's sentence on a scale of 1 to 5, where 1 is poor and 5 is excellent. Ensure the rating is provided as an integer and that there is no period at the end."},
                    ]
                )
                feedback = completion.choices[0].message.content
                print(f"initial feedback {feedback}")
                
                # Extract the rating from the feedback
                if feedback and feedback[-1].isdigit():
                    rating = feedback[-1]
                    feedback_without_rating = feedback[:-1].strip()
                else:
                    rating = "N/A"
                    feedback_without_rating = feedback

                list_of_messages.append({"feedback": feedback_without_rating, "rating": rating})
                print(f"Feedback: {feedback_without_rating}, Rating: {rating}")

        return jsonify({"status": "success", "message": "Messages processed", "feedback": list_of_messages}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
