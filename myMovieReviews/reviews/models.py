from django.db import models

class MovieReview(models.Model):
    title = models.CharField(max_length=100)
    director = models.CharField(max_length=100)
    main_cast = models.CharField(max_length=200)
    genre = models.CharField(max_length=50)
    release_year = models.IntegerField()
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    running_time = models.IntegerField()
    review_text = models.TextField()

    def __str__(self):
        return self.title
