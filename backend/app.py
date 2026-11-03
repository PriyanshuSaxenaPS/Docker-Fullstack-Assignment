
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Flask Backend is Running!"
    })

@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    course = data.get("course", "").strip()

    if not name or not email or not course:
        return jsonify({
            "success": False,
            "message": "All fields are required!"
        }), 400

    return jsonify({
        "success": True,
        "message": "Form submitted successfully!",
        "student": {
            "name": name,
            "email": email,
            "course": course
        }
    }), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
