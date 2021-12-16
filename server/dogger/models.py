from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class Users(models.Model):
    '''Users models.'''
    first_name = models.CharField(min_length=2, max_length=100)
    last_name = models.CharField(min_length=2, max_length=100)
    email = models.EmailField(
        'Dirección de email',
        primary_key=True,
        error_messages={
            'unique': 'Ya existe un usuario con este email.'
        }
    )
    password = models.CharField()

    def __str__ (self):
        return self.email

class Walkers(models.Model):
    '''Users models.'''
    first_name = models.CharField(min_length=2, max_length=100)
    last_name = models.CharField(min_length=2, max_length=100)
    email = models.EmailField(
        'Dirección de email',
        primary_key=True,
        error_messages={
            'unique': 'Ya existe un usuario con este email.'
        }
    )
    password = models.CharField()

    def __str__ (self):
        return self.email

class Dogs(models.Model):
    name = models.CharField(max_length=50)
    age = models.IntegerField()
    size = models.ForeignKey('DogSize', on_delete=models.DO_NOTHING)
    owner = models.ForeignKey('Users', on_delete=models.CASCADE)
    walker = models.ForeignKey('Walkers', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__ (self):
        return self.name

class DogSize(models.Model):
    size = models.CharField(max_length=8)

    def __str__ (self):
        return self.size

class Schedules(models.Model):
    day_of_week = models.CharField(max_length=10, default='Monday',
        choices=(('monday', 'Monday'),
            ('tuesday', 'Tuesday'),
            ('wednesday', 'Wednesday'),
            ('thursday', 'Thursday'),
            ('friday', 'Friday'),
            ('saturday', 'Saturday'),
            ('sunday', 'Sunday')))
    hour = models.PositiveSmallIntegerField(validators=[MinValueValidator(7), MaxValueValidator(20)])
    sizes = models.ManyToManyField(DogSize)

    def __str__(self):
        return '{} - {}:00 hrs'.format(
            self.day_of_week__display,
            self.hour
        )

class ScheduledWalks(models.Model):
    start = models.TimeField()
    end = models.TimeField()

    dogs = models.ManyToManyField(Dogs)
    users = models.ManyToManyField(Users)
    schedule = models.ForeignKey(Schedules, on_delete=models.SET_NULL)
    walker = models.ForeignKey(Walkers, on_delete=models.SET_NULL)

    
    


