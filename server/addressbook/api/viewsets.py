from rest_framework import viewsets
from django.db import models
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *


class ContactViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Contact.objects.order_by("name")
    serializer_class = ContactSerializer

    def get_queryset(self):
        qs = super().get_queryset()

        # Get only contact about current authenticated user
        qs = qs.filter(user=self.request.user)

        # Add search capabilities
        search = self.request.query_params.get("search", None)
        if search:
            qs = qs.filter(
                models.Q(name__icontains=search)
                | models.Q(phone__icontains=search)
                | models.Q(email__icontains=search)
            )

        return qs
        
class PlayersViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Players.objects.order_by("name")
    serializer_class = PlayersSerializer

    def get_queryset(self):
        qs1 = super().get_queryset()

        # Get only contact about current authenticated user
        qs1 = qs1.filter(user=self.request.user)

        # Add search capabilities
        search = self.request.query_params.get("search", None)
        if search:
            qs1 = qs1.filter(
                models.Q(name__icontains=search)
                | models.Q(position__icontains=search)
                | models.Q(number__icontains=search)
            )

        return qs1