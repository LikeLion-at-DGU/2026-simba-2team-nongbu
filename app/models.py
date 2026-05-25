from django.db import models

# Create your models here.
class PracticeUser(models.Model):
    username = models.CharField(max_length=12, unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username