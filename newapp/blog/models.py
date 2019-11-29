from django.db import models
from django.contrib.auth.models import User


class Blog(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=2000)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    publish_date = models.DateTimeField('date published',auto_now_add=True)
