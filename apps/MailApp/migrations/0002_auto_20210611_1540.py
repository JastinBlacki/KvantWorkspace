# Generated by Django 3.1.5 on 2021-06-11 10:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('MailApp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='mailreceiver',
            name='is_important',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='kvantmessage',
            name='receivers',
            field=models.ManyToManyField(to='MailApp.MailReceiver'),
        ),
        migrations.AlterField(
            model_name='mailreceiver',
            name='receiver',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receivers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='MailSender',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_important', models.BooleanField(default=False)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='kvantmessage',
            name='sender',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='MailApp.mailsender'),
        ),
    ]
