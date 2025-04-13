from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random

app = Flask(__name__)
CORS(app)
students = []

# f = open('courses.json', 'r')
# courses = json.load(f)
# f.close()

f = open('testimonials.json', 'r')
testimonials = json.load(f)
f.close()

def addStudent(username, password, email):
    studentId = len(students) + 1
    newStudent = {
        "id": studentId,
        "username": username,
        "password": password,
        "email": email,
        "enrolledCourses": []
    }
    
    students.append(newStudent)
    return newStudent

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")
    
    for student in students:
        if (student["username"] == username):
            return jsonify({"success": False, "message": "Username already taken"})

    newStudent = addStudent(username, password, email)
    return jsonify({"success": True, "message": "Registration successful", "student": newStudent})
    
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    
    for student in students:
        if ((student["username"] == username) and (student["password"] == password)):
            return jsonify({"success": True, "student": student})
        
    return jsonify({"success": False, "message": "Invalid username or password"})

@app.route('/testimonials', methods=['GET'])
def getTestimonials():
    if (len(testimonials) < 2):
        return jsonify(testimonials)
    
    selected = random.sample(testimonials, 2)
    return jsonify(selected)

if __name__ == '__main__':
    app.run()