from django.shortcuts import render

def course_display(request, course_name):
    return render(request, "course/welcome.html", {"course_name": course_name})