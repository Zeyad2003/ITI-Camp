from django.urls import path
from . import views

app_name = 'students'

urlpatterns = [
    path('', views.home_view, name='home'),
    path('students/', views.students_view, name='students'),
    path('students/<int:pk>/', views.student_detail_view, name='student_detail'),
    path('students/delete/<int:pk>/', views.delete_student_view, name='delete_student'),
    path('deleted/', views.deleted_view, name='deleted'),
]
