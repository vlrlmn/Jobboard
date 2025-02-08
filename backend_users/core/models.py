from django.db import models
from django.utils import timezone
from users_app.models import User


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        app_label = 'core'
    def __str__(self):
        return self.title