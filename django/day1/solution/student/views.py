from django.shortcuts import render

def student_display(request, student_name):
    return render(request, "student/hello.html", {"student_name": student_name})
