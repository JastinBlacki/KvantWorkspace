from os.path import join
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from storages.backends.s3boto3 import S3Boto3Storage

permission = (
    ("Ученик", "Ученик"),
    ("Учитель", "Учитель"),
    ("Администратор", "Администратор")
)

theme = (("Темная", "dark"), ("Светлая", "light"))

color = (("Оранжевый", "orange"), ("Синий", "blue"))


def set_default_image():
    bucket = S3Boto3Storage()
    if not bucket.exists('default/user/user.png'):
        with open(join(settings.MEDIA_ROOT + '/default/user.png'), 'b+r') as f:
            bucket.save('default/user/user.png', f)
    return 'default/user/user.png'


def get_path(instance, filename):
    return f'user/{instance.username}/{filename}'


class KvantUser(AbstractUser):
    name        = models.CharField(max_length=100)
    surname     = models.CharField(max_length=100)
    patronymic  = models.CharField(max_length=100)
    permission  = models.CharField(choices=permission, max_length=100)
    color       = models.CharField(max_length=100, choices=color, default='blue')
    theme       = models.CharField(max_length=100, choices=theme, default='light')
    image       = models.ImageField(upload_to=get_path, default=set_default_image)

    def __str__(self):
        return f'{self.permission} {self.surname} {self.name[0]}.{self.patronymic[0]}.'


class KvantStudent(models.Model):
    student = models.ForeignKey(KvantUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.student.__str__()


class KvantTeacher(models.Model):
    teacher = models.ForeignKey(KvantUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.teacher.__str__()


class KvantAdmin(models.Model):
    admin = models.ForeignKey(KvantUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.admin.__str__()
