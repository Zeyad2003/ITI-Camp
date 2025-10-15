from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from django.urls import reverse

# -------------------------------
# Dummy data (no database)
# -------------------------------
STUDENTS = [
    {'id': 1, 'name': 'Zeyad Nasef', 'age': 22, 'email': 'zeyad@example.com', 'address': 'Menofia'},
    {'id': 2, 'name': 'Ahmed Ali', 'age': 20, 'email': 'ahmed@example.com', 'address': 'Cairo'},
    {'id': 3, 'name': 'Mona Hassan', 'age': 22, 'email': 'mona@example.com', 'address': 'Alexandria'},
    {'id': 4, 'name': 'Omar Said', 'age': 19, 'email': 'omar@example.com', 'address': 'Giza'},
]
DELETED = []

def find_student(pk, list_ref):
    for s in list_ref:
        if s['id'] == pk:
            return s
    return None


def home_view(request):
    """Home page"""
    return render(request, 'students/home.html')


def students_view(request):
    """Students page — show all students directly"""
    context = {
        'students': STUDENTS
    }
    return render(request, 'students/students.html', context)

def student_detail_view(request, pk):
    """Details for a specific student"""
    student = find_student(pk, STUDENTS) or find_student(pk, DELETED)
    if not student:
        return redirect(reverse('students:students'))
    return render(request, 'students/student_detail.html', {'student': student})


def delete_student_view(request, pk):
    """Move student from STUDENTS to DELETED"""
    if request.method == 'POST':
        student = find_student(pk, STUDENTS)
        if student:
            STUDENTS.remove(student)
            DELETED.append(student)
    return redirect(reverse('students:students'))


def deleted_view(request):
    """Show deleted students"""
    return render(request, 'students/deleted.html', {'deleted': DELETED})
