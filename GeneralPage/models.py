from django.db import models
from django.utils import timezone
from LoginPage.models import KvantUser
from StudentPage.models import FileStorage, ImageStorage


def setDefaultImage():
    return ImageStorage.objects.filter(upload_path='default/')[0]


class KvantNews(models.Model):
    content = models.TextField()
    title = models.CharField(max_length=100)
    date = models.DateField(default=timezone.now)
    files = models.ManyToManyField(FileStorage, blank=True)
    author = models.ForeignKey(KvantUser, on_delete=models.CASCADE)
    image = models.ForeignKey(ImageStorage, default=setDefaultImage,
                              blank=True, on_delete=models.SET(setDefaultImage))

    def __str__(self):
        return f'Новость: {self.title}'


class KvantMessage(models.Model):
    task = models.TextField(blank=True)
    date = models.DateField(default=timezone.now)
    files = models.ManyToManyField(FileStorage, blank=True)
    sender = models.ForeignKey(KvantUser, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(KvantUser, on_delete=models.CASCADE, related_name='receiver')

    def __str__(self):
        return f'Письмо от {self.sender} к {self.receiver}'
