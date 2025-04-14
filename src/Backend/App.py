from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random

app = Flask(__name__)
CORS(app)
students = []

with open('src/Backend/courses.json', 'r', encoding='UTF-8') as file:
    courses = json.load(file)

f = open('src/Backend/testimonials.json', 'r')
testimonials = json.load(f)
f.close()

def addStudent(username, password, email):
    studentId = len(students) + 1
    newStudent = {
        "id": str(studentId),
        "username": username,
        "password": password,
        "email": email,
        "enrolled_courses": []
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

@app.route("/enroll/<student_id>", methods=['GET','POST'])
def enroll(student_id):
    data = request.get_json()
    course_to_enroll = [course for course in courses if course['id'] == data['course']]
    for student in students:
        if student['id'] == student_id:
            student['enrolled_courses'] += course_to_enroll
            return jsonify(data)
    return jsonify({'error': 'Student not found'})

@app.route("/drop/<student_id>", methods=['GET', 'DELETE'])
def delete(student_id):
    data = request.get_json()
    course_to_drop = [course for course in courses if course['id'] == data['course']]
    print(course_to_drop)
    for student in students:
        if student['id'] == student_id:
            student['enrolled_courses'] = [course for course in student['enrolled_courses'] if course not in course_to_drop]
            return jsonify(data)
    return jsonify({'error': 'Student not found'})

@app.route("/courses", methods=['GET'])
def get_all():
    return jsonify(courses)

@app.route("/student_courses/<student_id>", methods=['GET'])
def get_student(student_id):
    for student in students:
        if student['id'] == student_id:
            return jsonify(student['enrolled_courses'])
    return jsonify({'Error': 'Student not found'})

if __name__ == '__main__':
    app.run()