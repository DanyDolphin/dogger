'''Dogger serializers'''

# Django
from django.contrib.auth import authenticate

# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token

# Dogger
from dogger.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        depth = 1

    def create(self, data):
        """Creates a user with special function."""
        user = Users.objects.create_user(**data)
        return user

class LoginSerializer(serializers.Serializer):
    '''Serializer for Login'''

    email = serializers.EmailField()
    password = serializers.CharField(min_length=8)

    def validate(self, data):
        '''Checks credentials'''
        user = authenticate(username=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Usuario o contraseña incorrectos')
        self.context['user'] = user
        return data

    def create(self, data):
        """Crea o regresa el token del usuario"""
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key

class DogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dogs
        fields = '__all__'
        depth = 1

class DogSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DogSize
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedules
        fields = '__all__'
        depth = 1

class ScheduledWalkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduledWalks
        fields = '__all__'
        depth = 3

class WalkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        depth = 5
