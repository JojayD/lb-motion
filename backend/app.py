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
    top_scores = request.json.get('topScores', [])
    print("Here is the language:", language)
    print(f'These are the messages', messages)
    print(f'These are the top scores', top_scores)
    
    list_of_messages = []
    try:
        for i, message in enumerate(messages):
            if message['role'] == 'user':  # Only process user messages
                message_id = f"user_message_{i}"
                print(f"Processing message_id: {message_id}")
                scores = next((item['scores'] for item in top_scores if item['messageId'] == message_id), [])
                print(f"Found scores: {scores} for message_id: {message_id}")
                scores_names = ', '.join([score['name'] for score in scores])
                print(f"SCORES NAMES: {scores_names}")
                
                completion = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                        {"role": "system",
                        "content": f"This assistant provides grammatical feedback and corrections for English sentences. It explains the necessary corrections and changes only in the user's preferred language, {language}, and must not use any other language in the feedback."},
                        {"role": "user", "content": f"Here's an English sentence: '{message['content']}'. The user's tones are: {scores_names}. Please provide grammatical corrections and explain the necessary changes strictly in the user's language: {language}. The user cannot understand English so you must respond in only {language}."},
                    ]
                )


                completion_2 = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                        {"role": "system",
                        "content": f"This assistant provides feedback and corrections for English sentences. It rates the sentences from 1 to 5 based on grammar, naturalness, fluency, and how well the user's tone matches the message. It explains the corrections strictly in the user's preferred language, {language}, and must not use any other language in the feedback. The assistant does not help convey the tone/expression but assesses if the tone matches the sentence content appropriately."},
                        {"role": "user", "content": f"Here's an English sentence: '{message['content']}'. The user's tones are: {scores_names}. Please rate the sentence on a scale from 1 to 5 for grammar, naturalness, fluency, and tone matching. Use the following scale: 1 = Very poor, 2 = Poor, 3 = Fair, 4 = Good, 5 = Excellent. Reply with only the rating number."},
                    ]
                )


                feedback = completion.choices[0].message.content
                print(f"initial feedback {feedback}")

                rating = completion_2.choices[0].message.content
                print(f"Rating: {rating}")

                # Extract the number from the rating
                def extract_number_from_string(text):
                    match = re.search(r'\d+', text)
                    if match:
                        return match.group()
                    else:
                        print("no number found")
                        return None

                official_rating = extract_number_from_string(rating)

                list_of_messages.append({"feedback": feedback, "rating": official_rating})
                print(f"Feedback: {feedback}, Rating: {official_rating}")

        # Process top scores
        for score_entry in top_scores:
            message_id = score_entry.get('messageId')
            scores = score_entry.get('scores')
            print(f"Top scores for message {message_id}: {scores}")

        return jsonify({"status": "success", "message": "Messages processed", "feedback": list_of_messages}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
