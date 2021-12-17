'''Dogger models'''

# Django
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.fields import related

# Django REST Framework

# Create your models here.

class UserManager(BaseUserManager):
    """Custom user manager

    needed to override create_user and create_superuser methods,
    due to changing username with email as ID
    """

    def create_user(self, email, password, **extra_fields):
        """
        Creates and save a user with email and password
        """
        if not email:
            raise ValueError(_('Debes ingresar un correo electrónico'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Creates and save a superuser with email and password
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)

class Users(AbstractUser):
    '''
    Users models.
    Extends from AbstractUser for authentication functionality
    changes username with email and add data

    This models works for Users and Walker
    '''

    # Deleting username field
    username = None

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(
        'Dirección de email',
        unique=True,
        error_messages={
            'unique': 'Ya existe un usuario con este email.'
        }
    )

    # walker flag
    is_walker = models.BooleanField(default=False)

    # Primary key = email
    USERNAME_FIELD = 'email'

    # Required fields to create a user
    REQUIRED_FIELDS = ['first_name', 'last_name']

    # New user manager registered
    objects = UserManager()

    def __str__(self):
        """Return username."""
        return self.email

    def get_short_name(self):
        """Return username."""
        return self.email

class Dogs(models.Model):
    name = models.CharField(max_length=50)
    age = models.IntegerField()
    size = models.ForeignKey('DogSize', on_delete=models.DO_NOTHING)
    owner = models.ForeignKey('Users', on_delete=models.CASCADE, related_name='%(class)s_owner')
    walker = models.ForeignKey('Users', null=True, blank=True, on_delete=models.SET_NULL, related_name='%(class)s_walker')

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

    walker = models.ForeignKey('Users', on_delete=models.CASCADE)

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
    schedule = models.ForeignKey(Schedules, null=True, blank=True, on_delete=models.SET_NULL)
    walker = models.ForeignKey(Users, null=True, blank=True, on_delete=models.SET_NULL, related_name='%(class)s_users')

    
    


