from django.db import models
from django.utils import timezone
from LoginApp.models import KvantUser
from SystemModule.models import FileStorage


class MailReceiver(models.Model):
    is_read = models.BooleanField(default=False)
    receiver = models.ForeignKey(KvantUser, on_delete=models.CASCADE, related_name='receivers')


class KvantMessage(models.Model):
    text = models.TextField(blank=True)
    style_text = models.TextField(blank=True)
    date = models.DateField(default=timezone.now)
    receivers = models.ManyToManyField(MailReceiver)
    files = models.ManyToManyField(FileStorage, blank=True)
    title = models.CharField(max_length=120, default='Письмо')
    sender = models.ForeignKey(KvantUser, on_delete=models.CASCADE, related_name='sender')

    class Meta:
        ordering = ['-date', '-id']

    def __str__(self):
        return f'Письмо от {self.sender} к {", ".join([receiver.__str__() for receiver in self.receivers.all()])}'


class ImportantMail(models.Model):
    user = models.ForeignKey(KvantUser, on_delete=models.CASCADE)
    mail = models.ForeignKey(KvantMessage, on_delete=models.CASCADE)
