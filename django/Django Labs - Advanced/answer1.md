# Lab 1: Query Optimization

## Implementation

### Models
```python
class Movie(models.Model):
    movie_id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=500)
    genres = models.CharField(max_length=200)

class Rating(models.Model):
    user_id = models.IntegerField()
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='ratings')
    rating = models.FloatField()
    timestamp = models.IntegerField()
```

### Views

**N+1 Problem:**
```python
def n_plus_one_problem(request):
    ratings = Rating.objects.all()[:50]  # 1 query
    for rating in ratings:
        print(rating.movie.title)  # 50 extra queries!
    # Total: 51 queries
```

**Fix with select_related:**
```python
def optimized_query(request):
    ratings = Rating.objects.select_related('movie').all()[:50]  # 1 query with JOIN
    for rating in ratings:
        print(rating.movie.title)  # No extra queries
    # Total: 1 query
```

**Fix with prefetch_related:**
```python
def prefetch_example(request):
    movies = Movie.objects.prefetch_related('ratings').all()[:10]  # 2 queries
    for movie in movies:
        print(movie.ratings.count())  # No extra queries
    # Total: 2 queries
