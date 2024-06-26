
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
import re


# Load environment variables and initialize services
load_dotenv(find_dotenv())
openai_api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=openai_api_key)

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    return "Hello, World!"


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
                

                completion = client.chat.completions.create(
                    model="gpt-4o",  # Make sure to use the correct model identifier
                    messages=[
                        {"role": "system",
                         "content": "This assistant provides grammatical feedback and corrections for English sentences. It explains the necessary corrections and changes in the user's preferred language to enhance understanding and clarity."},
                        {"role": "user", "content": f"Here's an English sentence: '{message['content']}'. Please provide grammatical corrections and explanations for the necessary changes in {language}."},
                    ]
                )

                completion_2 = client.chat.completions.create(
                    model="gpt-4o",  # Make sure to use the correct model identifier
                    messages=[
                        {"role": "system",
                         "content": "This assistant is designed to provide grammatical feedback and corrections for English sentences, rating them from 1 to 5 based on grammar, naturalness, and fluency. It explains the corrections in the user's preferred language to enhance understanding and learning."},
                        {"role": "user", "content": f"Here's an English sentence: '{message['content']}'. Please provide a single digit rating from 1 to 5, evaluating how grammatical, natural, and fluent the sentence is. Use the following scale: 1 = Very poor, 2 = Poor, 3 = Fair, 4 = Good, 5 = Excellent. Reply with only the number."},
                    ]
                )

                feedback = completion.choices[0].message.content
                print(f"initial feedback {feedback}")

                rating = completion_2.choices[0].message.content
                print(f"Rating: {rating}")
                
                # Extract the number from the rating
                def extract_number_from_string(text):
                # Search for the first occurrence of a digit in the string
                    match = re.search(r'\d+', text)
                    if match:
                        return match.group()
                    else:
                        print("no number found")
                        return None
                
                official_rating = extract_number_from_string(rating)

                list_of_messages.append({"feedback": feedback, "rating": official_rating})
                print(f"Feedback: {feedback}, Rating: {official_rating}")

        return jsonify({"status": "success", "message": "Messages processed", "feedback": list_of_messages}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
