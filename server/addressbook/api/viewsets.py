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
    queryset = Player.objects.order_by("name")
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


class TeamViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Team.objects.order_by("name")
    serializer_class = TeamSerializer

    def get_queryset(self):
        qs2 = super().get_queryset()
        # Get only contact about current authenticated user
        qs2 = qs2.filter(user=self.request.user)
        # Add search capabilities
        search = self.request.query_params.get("search", None)
        if search:
            qs2 = qs2.filter(
                models.Q(name__icontains=search)
                | models.Q(position__icontains=search)
                | models.Q(number__icontains=search)
            )

        return qs2


class MatchViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Match.objects.order_by("-date")
    serializer_class = MatchSerializer

    def get_queryset(self):
        qs3 = super().get_queryset()
        # Get only contact about current authenticated user
        qs3 = qs3.filter(user=self.request.user)
        # Add search capabilities
        search = self.request.query_params.get("search", None)
        if search:
            qs3 = qs3.filter(
                models.Q(tournament_name__icontains=search)
                | models.Q(date__icontains=search)
                | models.Q(opponent__icontains=search)
            )
        return qs3


class PerformanceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Performance.objects.order_by("-date")
    serializer_class = PerformanceSerializer

    def get_queryset(self):
        qs4 = super().get_queryset()
        # Get only contact about current authenticated user
        qs4 = qs4.filter(user=self.request.user)
        # Add search capabilities
        search = self.request.query_params.get("search", None)
        if search:
            qs4 = qs4.filter(
                models.Q(name1__icontains=search)
                | models.Q(tournament__icontains=search)
                | models.Q(date__icontains=search)
                | models.Q(position__icontains=search)
            )
        return qs4


class VideoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Video.objects.order_by("-date")
    serializer_class = VideoSerializer

    def get_queryset(self):
        qs5 = super().get_queryset()
        # Get only contact about current authenticated user
        qs5 = qs5.filter(user=self.request.user)
        # Add search capabilities
        search = self.request.query_params.get("search", None)
        if search:
            qs5 = qs5.filter(
                models.Q(tournament__icontains=search)
                | models.Q(type__icontains=search)
                | models.Q(opponent__icontains=search)
                | models.Q(date__icontains=search) 
                | models.Q(win_lose__icontains=search)
            )
        return qs5
