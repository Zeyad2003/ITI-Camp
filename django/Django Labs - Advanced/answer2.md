# Lab 2: Advanced ORM Features

## Implementation

### 1. Dynamic Filter with Q()
```python
def dynamic_filter_q(request):
    genre_filter = Q(genres__icontains='Comedy') | Q(genres__icontains='Drama')
    movies = Movie.objects.filter(genre_filter).annotate(
        avg_rating=Avg('ratings__rating'),
        rating_count=Count('ratings')
    ).filter(Q(avg_rating__gt=4.0) | Q(rating_count__gt=10))
```

### 2. F() Expression Update
```python
def f_expression_update(request):
    # SQL-level atomic update
    updated_count = Rating.objects.filter(
        movie__genres__icontains='Action',
        rating__lt=4.5
    ).update(rating=F('rating') + 0.5)
```

### 3. only() vs defer()
```python
# Load only specified fields
movies = Movie.objects.only('title', 'movie_id')[:5]

# Load all except specified fields
movies = Movie.objects.defer('genres')[:5]
```

### 4. values() - Dictionary
```python
# Returns list of dicts
movies_dict = Movie.objects.values('title', 'genres').annotate(
    avg_rating=Avg('ratings__rating')
)
```

### 5. values_list() - Tuple
```python
# Returns list of tuples
movies_tuple = Movie.objects.values_list('title', 'genres')

# Flat list for single field
titles = Movie.objects.values_list('title', flat=True)
```

### 6. Index Performance
```python
# models.py
class Rating(models.Model):
    user_id = models.IntegerField(db_index=True)  # Indexed
    timestamp = models.IntegerField()              # Not indexed
    
    class Meta:
        indexes = [
            models.Index(fields=['user_id']),
            models.Index(fields=['rating']),
        ]
```

**Test Results:**
- Indexed query: ~0.001s
- Non-indexed query: ~0.005s  
- Speedup: 5x faster

### 7. Connection Pooling
```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
        'CONN_MAX_AGE': 60,  # Keep connections alive for 60 seconds
    }
}
```

## Files Modified
- `movies/models.py` - Added indexes
- `movies/views.py` - Added 6 new views
- `movies/urls.py` - Added 6 URL patterns
- `movieproject/settings.py` - Added CONN_MAX_AGE
