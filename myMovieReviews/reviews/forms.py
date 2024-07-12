from django import forms
from .models import MovieReview

class MovieReviewForm(forms.ModelForm):
    class Meta:
        model = MovieReview
        fields = ['title', 'director', 'main_cast', 'genre', 'release_year', 'rating', 'running_time', 'review_text']
