from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', )

class ContactSerializer(serializers.ModelSerializer):

    # Create new contact associated with current authenticated user
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        contact = super().create(validated_data)
        return contact

    class Meta:
        model = Contact
        exclude = ('user', )

class PlayersSerializer(serializers.ModelSerializer):

    # Create new contact associated with current authenticated user
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        player = super().create(validated_data)
        return player

    class Meta:
        model = Player
        exclude = ('user', )


class TeamSerializer(serializers.ModelSerializer):

    # Create new contact associated with current authenticated user
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        team = super().create(validated_data)
        return team

    class Meta:
        model = Team
        exclude = ('user', )


class MatchSerializer(serializers.ModelSerializer):

    # Create new contact associated with current authenticated user
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        match = super().create(validated_data)
        return match

    class Meta:
        model = Match
        exclude = ('user', )


class MatchSerializer(serializers.ModelSerializer):

    # Create new contact associated with current authenticated user
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        match = super().create(validated_data)
        return match

    class Meta:
        model = Match
        exclude = ('user', )


class PerformanceSerializer(serializers.ModelSerializer):

    # Create new contact associated with current authenticated user
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        performance = super().create(validated_data)
        return performance

    class Meta:
        model = Performance
        exclude = ('user', )


class VideoSerializer(serializers.ModelSerializer):

    # Create new contact associated with current authenticated user
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        video = super().create(validated_data)
        return video

    class Meta:
        model = Video
        exclude = ('user', )


class VideoKSerializer(serializers.ModelSerializer):

    # Create new contact associated with current authenticated user
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        videok = super().create(validated_data)
        return videok

    class Meta:
        model = VideoK
        exclude = ('user', )
