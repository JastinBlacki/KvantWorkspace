from django.urls import path

from . import views

urlpatterns = [
    path('admins', views.AdminsTableTemplateView.as_view(), name='admins_table'),
    path('students', views.StudentsTableTemplateView.as_view(), name='students_table'),
    path('teachers', views.TeachersTableTemplateView.as_view(), name='teachers_table'),
    path('subjects', views.StudentsTableTemplateView.as_view(), name='subjects_table'),
    path('courses', views.CoursesTableTemplateView.as_view(), name='courses_table'),
]
