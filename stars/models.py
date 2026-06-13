from django.db import models
from spaces.models import Space
from django.contrib.auth.models import User

class Star(models.Model):
    star_id = models.BigAutoField(primary_key=True)
    space = models.ForeignKey(Space, on_delete=models.CASCADE, related_name='stars')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='stars')
    content = models.TextField(null=True)
    image = models.ImageField(null=True, blank=True, upload_to='stars/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}님의 별"