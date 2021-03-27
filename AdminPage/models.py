from django.db import models
from LoginPage.models import KvantStudent, KvantTeacher
from TeacherPage.models import KvantLessonMark, KvantLessonHomeWork


class KvantCourse(models.Model):
    name = models.CharField(max_length=150)
    students = models.ManyToManyField(KvantStudent, blank=True)
    teacher = models.ForeignKey(KvantTeacher, on_delete=models.SET_DEFAULT, default=None)

    def __str__(self):
        return f'Курс {self.name}'


class KvantLesson(models.Model):
    date = models.DateField()
    mark = models.ManyToManyField(KvantLessonMark, blank=True)
    course = models.ForeignKey(KvantCourse, on_delete=models.CASCADE)
    task = models.OneToOneField(KvantLessonHomeWork, on_delete=models.CASCADE, blank=True, default=None)

    def __str__(self):
        return f'Урок {self.date}'
