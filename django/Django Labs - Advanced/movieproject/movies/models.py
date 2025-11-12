from django.db import models


class Movie(models.Model):
    """
    Stores movie information
    """
    movie_id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=500, db_index=True)  # Added index for Lab 2
    genres = models.CharField(max_length=200)
    
    class Meta:
        db_table = 'movies'
        indexes = [
            models.Index(fields=['title']),  # Lab 2: Index for performance testing
        ]
    
    def __str__(self):
        return self.title


class Rating(models.Model):
    """
    Stores user ratings for movies
    Relationship: Many Ratings → One Movie (ForeignKey)
    """
    user_id = models.IntegerField(db_index=True)  # Lab 2: Indexed field
    movie = models.ForeignKey(
        Movie, 
        on_delete=models.CASCADE,
        related_name='ratings'
    )
    rating = models.FloatField()
    timestamp = models.IntegerField()  # Lab 2: Non-indexed field for comparison
    
    class Meta:
        db_table = 'ratings'
        indexes = [
            models.Index(fields=['user_id']),  # Lab 2: Index for performance testing
            models.Index(fields=['rating']),
        ]
    
    def __str__(self):
        return f"User {self.user_id} rated {self.movie.title}: {self.rating}"


class Tag(models.Model):
    """
    Stores user tags for movies
    Relationship: Many Tags → One Movie (ForeignKey)
    """
    user_id = models.IntegerField()
    movie = models.ForeignKey(
        Movie, 
        on_delete=models.CASCADE,
        related_name='tags'
    )
    tag = models.CharField(max_length=200)
    timestamp = models.IntegerField()
    
    class Meta:
        db_table = 'tags'
    
    def __str__(self):
        return f"{self.tag} - {self.movie.title}"


class Link(models.Model):
    """
    Stores external links for movies
    Relationship: One Link → One Movie (OneToOneField)
    """
    movie = models.OneToOneField(
        Movie, 
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='link'
    )
    imdb_id = models.CharField(max_length=20)
    tmdb_id = models.CharField(max_length=20, null=True, blank=True)
    
    class Meta:
        db_table = 'links'
    
    def __str__(self):
        return f"Links for {self.movie.title}"

