from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection, reset_queries
from django.db.models import Q, F, Avg, Count
from .models import Movie, Rating, Tag
import time

# Import Lab 3 views
from .views_lab3 import silk_demo, cprofile_demo, bottleneck_demo_before, bottleneck_demo_after


def n_plus_one_problem(request):
    """
    Demonstrates the N+1 query problem
    Fetches 50 ratings and their related movie titles WITHOUT optimization
    """
    reset_queries()
    
    # Fetch 50 ratings (1 query)
    ratings = Rating.objects.all()[:50]
    
    # Access movie for each rating (50 additional queries!)
    output = []
    for rating in ratings:
        output.append(f"User {rating.user_id} rated '{rating.movie.title}' - {rating.rating}/5.0")
    
    # Count queries
    query_count = len(connection.queries)
    
    result = f"""
    <h2>N+1 Query Problem Demo</h2>
    <p style="color: red;"><strong>⚠️ Query Count: {query_count}</strong> (Should be ~51: 1 for ratings + 50 for movies)</p>
    <h3>Results:</h3>
    <ul>
        {''.join([f'<li>{line}</li>' for line in output[:10]])}
        <li><em>... and {len(output) - 10} more results</em></li>
    </ul>
    <p><a href="/optimized/">See Optimized Version →</a></p>
    """
    return HttpResponse(result)


def optimized_query(request):
    """
    Fixed version using select_related
    Fetches 50 ratings with their movies in ONE query
    """
    reset_queries()
    
    # Fetch ratings WITH related movies (1 query using JOIN)
    ratings = Rating.objects.select_related('movie').all()[:50]
    
    # Access movie data (no additional queries!)
    output = []
    for rating in ratings:
        output.append(f"User {rating.user_id} rated '{rating.movie.title}' - {rating.rating}/5.0")
    
    # Count queries
    query_count = len(connection.queries)
    
    result = f"""
    <h2>Optimized Query with select_related()</h2>
    <p style="color: green;"><strong>✅ Query Count: {query_count}</strong> (Should be 1!)</p>
    <h3>Results:</h3>
    <ul>
        {''.join([f'<li>{line}</li>' for line in output[:10]])}
        <li><em>... and {len(output) - 10} more results</em></li>
    </ul>
    <p><a href="/n-plus-one/">← Back to N+1 Problem</a> | <a href="/prefetch/">See prefetch_related →</a></p>
    """
    return HttpResponse(result)


def prefetch_example(request):
    """
    Demonstrates prefetch_related for reverse ForeignKey
    Fetches movies with all their ratings
    """
    reset_queries()
    
    # Fetch 10 movies with all their ratings (2 queries total)
    movies = Movie.objects.prefetch_related('ratings').all()[:10]
    
    output = []
    for movie in movies:
        if movie.ratings.exists():
            avg_rating = sum(r.rating for r in movie.ratings.all()) / movie.ratings.count()
            output.append(f"{movie.title} - Avg Rating: {avg_rating:.2f} ({movie.ratings.count()} ratings)")
        else:
            output.append(f"{movie.title} - No ratings")
    
    query_count = len(connection.queries)
    
    result = f"""
    <h2>prefetch_related() Example</h2>
    <p style="color: blue;"><strong>Query Count: {query_count}</strong> (Should be 2: 1 for movies + 1 for all ratings)</p>
    <h3>Results:</h3>
    <ul>
        {''.join([f'<li>{line}</li>' for line in output])}
    </ul>
    <p><a href="/optimized/">← Back to select_related</a></p>
    """
    return HttpResponse(result)


def home(request):
    return HttpResponse("""
    <h1>Django ORM Labs</h1>
    <h2>Lab 1: Query Optimization</h2>
    <ul>
        <li><a href="/n-plus-one/">N+1 Problem</a></li>
        <li><a href="/optimized/">select_related()</a></li>
        <li><a href="/prefetch/">prefetch_related()</a></li>
    </ul>
    <h2>Lab 2: Advanced ORM</h2>
    <ul>
        <li><a href="/lab2/dynamic-filter/">Q() Filter</a></li>
        <li><a href="/lab2/f-expression/">F() Update</a></li>
        <li><a href="/lab2/only-defer/">only()/defer()</a></li>
        <li><a href="/lab2/values-dict/">values()</a></li>
        <li><a href="/lab2/values-list/">values_list()</a></li>
        <li><a href="/lab2/index-performance/">Index Test</a></li>
    </ul>
    <h2>Lab 3: Monitoring</h2>
    <ul>
        <li><a href="/lab3/silk-demo/">Silk Demo</a></li>
        <li><a href="/lab3/cprofile-demo/">cProfile</a></li>
        <li><a href="/lab3/bottleneck-before/">Bottleneck (Before)</a></li>
        <li><a href="/lab3/bottleneck-after/">Bottleneck (After)</a></li>
        <li><a href="/silk/">Silk Dashboard</a></li>
    </ul>
    """)


# ============================================================================
# LAB 2: ADVANCED ORM FEATURES
# ============================================================================

def dynamic_filter_q(request):
    """
    Lab 2: Dynamic filter query using Q() expression
    Build complex OR/AND queries dynamically
    """
    reset_queries()
    
    # Example: Find movies that are either:
    # - Comedy OR Drama genre AND
    # - Have ratings > 4.0 OR have more than 10 ratings
    
    # Build dynamic Q objects
    genre_filter = Q(genres__icontains='Comedy') | Q(genres__icontains='Drama')
    
    # Get movies with their rating stats
    movies = Movie.objects.filter(genre_filter).annotate(
        avg_rating=Avg('ratings__rating'),
        rating_count=Count('ratings')
    ).filter(
        Q(avg_rating__gt=4.0) | Q(rating_count__gt=10)
    ).order_by('-avg_rating')[:20]
    
    output = []
    for movie in movies:
        output.append(
            f"{movie.title} | Genres: {movie.genres} | "
            f"Avg Rating: {movie.avg_rating:.2f} | Count: {movie.rating_count}"
        )
    
    query_count = len(connection.queries)
    
    result = f"""
    <h2>Lab 2: Dynamic Filter with Q() Expression</h2>
    <p><strong>Query:</strong> Movies that are (Comedy OR Drama) AND (avg_rating > 4.0 OR rating_count > 10)</p>
    <p>Query Count: {query_count}</p>
    <h3>Results ({len(output)} movies):</h3>
    <ul>
        {''.join([f'<li>{line}</li>' for line in output])}
    </ul>
    <p><a href="/">← Back to Home</a></p>
    """
    return HttpResponse(result)


def f_expression_update(request):
    """
    Lab 2: Update field values using F() expression
    Performs updates at SQL level without loading into Python
    """
    reset_queries()
    
    # Example: Simulate rating boost by 0.5 for all movies in Action genre
    # Using F() expression avoids race conditions and is more efficient
    
    # First, let's see some ratings before update
    before_ratings = list(Rating.objects.filter(
        movie__genres__icontains='Action'
    ).select_related('movie')[:5].values('movie__title', 'rating', 'user_id'))
    
    # Update using F() expression - happens in SQL
    updated_count = Rating.objects.filter(
        movie__genres__icontains='Action',
        rating__lt=4.5  # Only boost ratings below 4.5
    ).update(rating=F('rating') + 0.5)
    
    # Check after update
    after_ratings = list(Rating.objects.filter(
        movie__genres__icontains='Action'
    ).select_related('movie')[:5].values('movie__title', 'rating', 'user_id'))
    
    query_count = len(connection.queries)
    
    result = f"""
    <h2>Lab 2: F() Expression Update</h2>
    <p><strong>Action:</strong> Boosted ratings by 0.5 for Action movies (where rating < 4.5)</p>
    <p>Updated Count: {updated_count} ratings</p>
    <p>Query Count: {query_count}</p>
    
    <h3>Before Update (sample):</h3>
    <ul>
        {''.join([f"<li>{r['movie__title']} - User {r['user_id']}: {r['rating']}</li>" for r in before_ratings])}
    </ul>
    
    <h3>After Update (sample):</h3>
    <ul>
        {''.join([f"<li>{r['movie__title']} - User {r['user_id']}: {r['rating']}</li>" for r in after_ratings])}
    </ul>
    
    <p><strong>Note:</strong> F() expression runs at SQL level, avoiding race conditions!</p>
    <p><a href="/">← Back to Home</a></p>
    """
    return HttpResponse(result)


def only_defer_demo(request):
    """
    Lab 2: Select specific fields using only() and defer()
    only() - Load ONLY specified fields
    defer() - Load all fields EXCEPT specified ones
    """
    reset_queries()
    
    # Using only() - loads only specified fields
    movies_only = Movie.objects.only('title', 'movie_id')[:5]
    only_output = []
    for movie in movies_only:
        # Accessing 'title' doesn't trigger extra query
        only_output.append(f"ID: {movie.movie_id}, Title: {movie.title}")
        # Accessing 'genres' WOULD trigger an extra query (commented out)
        # only_output.append(f"Genres: {movie.genres}")
    
    only_queries = len(connection.queries)
    reset_queries()
    
    # Using defer() - loads all fields except specified ones
    movies_defer = Movie.objects.defer('genres')[:5]
    defer_output = []
    for movie in movies_defer:
        # Accessing 'title' doesn't trigger extra query
        defer_output.append(f"ID: {movie.movie_id}, Title: {movie.title}")
        # Accessing 'genres' WOULD trigger an extra query (commented out)
    
    defer_queries = len(connection.queries)
    
    result = f"""
    <h2>Lab 2: only() vs defer()</h2>
    
    <h3>only('title', 'movie_id') - Load ONLY these fields</h3>
    <p>Query Count: {only_queries}</p>
    <ul>
        {''.join([f'<li>{line}</li>' for line in only_output])}
    </ul>
    <p><em>Note: Accessing 'genres' would trigger additional queries!</em></p>
    
    <h3>defer('genres') - Load everything EXCEPT genres</h3>
    <p>Query Count: {defer_queries}</p>
    <ul>
        {''.join([f'<li>{line}</li>' for line in defer_output])}
    </ul>
    <p><em>Note: Accessing 'genres' would trigger additional queries!</em></p>
    
    <p><strong>Use Case:</strong> Use only() when you need few fields, defer() when you want to exclude heavy fields</p>
    <p><a href="/">← Back to Home</a></p>
    """
    return HttpResponse(result)


def values_dict_demo(request):
    """
    Lab 2: Retrieve data as dict using values()
    Returns dictionaries instead of model instances
    """
    reset_queries()
    
    # values() returns dict
    movies_dict = Movie.objects.values('title', 'genres').annotate(
        avg_rating=Avg('ratings__rating'),
        rating_count=Count('ratings')
    ).filter(rating_count__gt=20).order_by('-avg_rating')[:10]
    
    output = []
    for movie in movies_dict:
        output.append(
            f"Type: {type(movie).__name__} | "
            f"Title: {movie['title']} | "
            f"Avg: {movie['avg_rating']:.2f} | "
            f"Count: {movie['rating_count']}"
        )
    
    query_count = len(connection.queries)
    
    result = f"""
    <h2>Lab 2: values() - Dictionary Results</h2>
    <p>Query Count: {query_count}</p>
    <p><strong>Return Type:</strong> List of dictionaries (not model instances)</p>
    
    <h3>Top Rated Movies (dict format):</h3>
    <ul>
        {''.join([f'<li>{line}</li>' for line in output])}
    </ul>
    
    <p><strong>Advantage:</strong> Lower memory usage, faster when you don't need full model instances</p>
    <p><a href="/">← Back to Home</a></p>
    """
    return HttpResponse(result)


def values_list_demo(request):
    """
    Lab 2: Retrieve data as tuple using values_list()
    Returns tuples instead of model instances
    """
    reset_queries()
    
    # values_list() returns tuples
    movies_tuple = Movie.objects.values_list(
        'title', 'genres'
    ).annotate(
        avg_rating=Avg('ratings__rating'),
        rating_count=Count('ratings')
    ).filter(rating_count__gt=20).order_by('-avg_rating')[:10]
    
    output = []
    for movie in movies_tuple:
        output.append(
            f"Type: {type(movie).__name__} | "
            f"Data: {movie[0]} | {movie[1][:30]}... | "
            f"Avg: {movie[2]:.2f} | Count: {movie[3]}"
        )
    
    # values_list with flat=True (single field, flat list)
    titles_flat = list(Movie.objects.values_list('title', flat=True)[:5])
    
    query_count = len(connection.queries)
    
    result = f"""
    <h2>Lab 2: values_list() - Tuple Results</h2>
    <p>Query Count: {query_count}</p>
    <p><strong>Return Type:</strong> List of tuples</p>
    
    <h3>Top Rated Movies (tuple format):</h3>
    <ul>
        {''.join([f'<li>{line}</li>' for line in output])}
    </ul>
    
    <h3>Using flat=True (single field):</h3>
    <p>{', '.join(titles_flat)}</p>
    
    <p><strong>Advantage:</strong> Most memory efficient, good for data export or processing</p>
    <p><a href="/">← Back to Home</a></p>
    """
    return HttpResponse(result)


def index_performance_test(request):
    """
    Lab 2: Test performance difference between indexed and non-indexed fields
    """
    reset_queries()
    
    # Test 1: Query on INDEXED field (user_id)
    start_time = time.time()
    indexed_results = Rating.objects.filter(user_id=1).count()
    indexed_time = time.time() - start_time
    indexed_queries = len(connection.queries)
    indexed_sql = connection.queries[-1]['sql'] if connection.queries else "No query"
    
    reset_queries()
    
    # Test 2: Query on NON-INDEXED field (timestamp)
    start_time = time.time()
    non_indexed_results = Rating.objects.filter(timestamp__gt=1000000000).count()
    non_indexed_time = time.time() - start_time
    non_indexed_queries = len(connection.queries)
    non_indexed_sql = connection.queries[-1]['sql'] if connection.queries else "No query"
    
    speedup = non_indexed_time / indexed_time if indexed_time > 0 else 0
    
    result = f"""
    <h2>Lab 2: Index Performance Comparison</h2>
    
    <h3>Test 1: INDEXED Field (user_id)</h3>
    <ul>
        <li><strong>Results:</strong> {indexed_results} records</li>
        <li><strong>Time:</strong> {indexed_time:.6f} seconds</li>
        <li><strong>Queries:</strong> {indexed_queries}</li>
        <li><strong>SQL:</strong> <code>{indexed_sql[:200]}</code></li>
    </ul>
    
    <h3>Test 2: NON-INDEXED Field (timestamp)</h3>
    <ul>
        <li><strong>Results:</strong> {non_indexed_results} records</li>
        <li><strong>Time:</strong> {non_indexed_time:.6f} seconds</li>
        <li><strong>Queries:</strong> {non_indexed_queries}</li>
        <li><strong>SQL:</strong> <code>{non_indexed_sql[:200]}</code></li>
    </ul>
    
    <h3>Performance Comparison</h3>
    <p><strong>Speedup:</strong> {speedup:.2f}x faster with index</p>
    <p><strong>Note:</strong> With larger datasets, the difference is more dramatic!</p>
    
    <p><a href="/">← Back to Home</a></p>
    """
    return HttpResponse(result)


