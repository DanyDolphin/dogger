from django.contrib import admin

# Register your models here.
from dogger.models import *

class AdminUsers(admin.ModelAdmin):
  list_display = ["email", "__str__"]
  list_filter = ["email", "first_name", "last_name"]
  search_fields = ["email", "first_name", "last_name"]
  class Meta:
      meta = Users

class AdminDogs(admin.ModelAdmin):
  list_display = ["name", "size", "owner", "walker"]
  list_filter = ["name", "size", "owner", "walker"]
  search_fields = ["name", "size", "owner", "walker"]
  class Meta:
      meta = Dogs


class AdminScheduledWalks(admin.ModelAdmin):
  list_display = ["schedule"]
  list_filter = ["schedule"]
  search_fields = ["schedule"]
  class Meta:
      meta = ScheduledWalks

admin.site.register(Users, AdminUsers)
admin.site.register(Dogs, AdminDogs)
admin.site.register(DogSize)
admin.site.register(Schedules)
admin.site.register(ScheduledWalks, AdminScheduledWalks)