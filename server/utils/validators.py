"""Custom validators for Models"""

# Django
from django.core.validators import RegexValidator

"""Phone number validator"""
PHONE_VALIDATOR = RegexValidator(
    regex=r'^[0-9].{10,}$',
    message="El número telefónico debe tener 10 dígitos"
)
