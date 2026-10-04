import os

from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai


load_dotenv()


app = Flask(__name__)

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "*"
        }
    }
)


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY is not configured.")


client = None

if GEMINI_API_KEY:
    client = genai.Client(
        api_key=GEMINI_API_KEY
    )


SYSTEM_PROMPT = """
You are ChefAI, an intelligent cooking assistant inside the ChefAI recipe application.

Your job is to help users with:

- Recipe generation
- Cooking instructions
- Ingredient substitutions
- Meal ideas
- Healthy meals
- Quick recipes
- Vegetarian and non-vegetarian recipes
- Pantry-based recipes
- Cooking tips
- Ingredient combinations
- Meal planning

Give practical and easy-to-follow answers.

When generating a recipe, structure the answer clearly with:

Recipe Name
Description
Ingredients
Instructions
Cooking Time
Difficulty
Tips

Keep responses concise enough to be useful inside a web application.

Do not claim to be a doctor or nutritionist.
For medical or serious dietary concerns, recommend consulting a qualified professional.

You are a cooking assistant, not a general-purpose assistant.
"""

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "ok",
        "service": "ChefAI Backend",
        "message": "ChefAI backend is running successfully."
    })
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "service": "ChefAI Backend",
        "gemini_configured": bool(GEMINI_API_KEY)
    })


@app.route("/api/ai/chat", methods=["POST"])
def ai_chat():

    if not client:
        return jsonify({
            "success": False,
            "message": "Gemini API key is not configured."
        }), 500

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "success": False,
            "message": "Request body is required."
        }), 400

    message = data.get("message", "").strip()

    if not message:
        return jsonify({
            "success": False,
            "message": "Message cannot be empty."
        }), 400

    try:

        prompt = f"""
{SYSTEM_PROMPT}

User request:

{message}
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        answer = response.text

        return jsonify({
            "success": True,
            "reply": answer
        })

    except Exception as error:

        print("Gemini error:", error)

        return jsonify({
            "success": False,
            "message": "Unable to generate an AI response.",
            "error": str(error)
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )