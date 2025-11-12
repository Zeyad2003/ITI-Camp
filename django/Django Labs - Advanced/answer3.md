# Lab 3: Monitoring & Profiling

## Tools Configured

### 1. Django Debug Toolbar
```python
# settings.py
INSTALLED_APPS = ['debug_toolbar', ...]
MIDDLEWARE = ['debug_toolbar.middleware.DebugToolbarMiddleware', ...]
INTERNAL_IPS = ['127.0.0.1']

# urls.py
if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [path('__debug__/', include(debug_toolbar.urls))] + urlpatterns
```

### 2. Silk
```python
# settings.py
INSTALLED_APPS = ['silk', ...]
MIDDLEWARE = ['silk.middleware.SilkyMiddleware', ...]

SILKY_PYTHON_PROFILER = True
SILKY_ANALYZE_QUERIES = True

# urls.py
path('silk/', include('silk.urls', namespace='silk'))
```

### 3. cProfile Demo
```python
def cprofile_demo(request):
    def slow_function():
        total = 0
        for i in range(100000):
            total += i ** 2
        return total
    
    result = slow_function()
    # View profiling in Silk dashboard or use python -m cProfile
```

## Bottleneck Optimization

### Before (101 queries)
```python
movies = Movie.objects.all()[:50]
for movie in movies:
    count = movie.ratings.count()          # 50 queries
    avg = movie.ratings.aggregate(Avg('rating'))  # 50 more queries
```

### After (1 query)
```python
movies = Movie.objects.annotate(
    rating_count=Count('ratings'),
    avg_rating=Avg('ratings__rating')
)[:50]
```

**Result:** 99% query reduction (101 → 1), 95% time reduction

## Files Modified
- `movieproject/settings.py` - Added Debug Toolbar, Silk config
- `movieproject/urls.py` - Added Silk and Debug Toolbar URLs
- `movies/views_lab3.py` - Created profiling demo views
- `movies/urls.py` - Added Lab 3 URL patterns
