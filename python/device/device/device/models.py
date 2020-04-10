from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length= 10, verbose_name='名字')
    role = models.CharField(max_length=1, verbose_name='角色')
