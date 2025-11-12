"""
Lab 3: Monitoring & Profiling Views
"""
from django.http import HttpResponse
from django.db import connection, reset_queries
from django.db.models import Avg, Count
from .models import Movie, Rating
import time


def silk_demo(request):
    """
    Lab 3: Demo view for Silk profiling
    This view performs multiple operations that Silk will profile
    """
    reset_queries()
    
    # Operation 1: Complex aggregation query
    top_movies = Movie.objects.annotate(
        avg_rating=Avg('ratings__rating'),
        rating_count=Count('ratings')
    ).filter(rating_count__gt=10).order_by('-avg_rating')[:10]
    
    # Operation 2: N+1 problem (intentional for profiling)
    ratings = Rating.objects.all()[:20]
    titles = [r.movie.title for r in ratings]
    
    # Operation 3: Optimized query
    ratings_opt = Rating.objects.select_related('movie').all()[:20]
    titles_opt = [r.movie.title for r in ratings_opt]
    
    # Some CPU-intensive work
    import math
    results = [math.sqrt(i) for i in range(10000)]
    
    query_count = len(connection.queries)
    
    result = f"""
    <h2>Lab 3: Silk Profiling Demo</h2>
    <p>This view performs various operations that Silk profiles:</p>
    <ul>
        <li>✓ Complex aggregation query</li>
        <li>✓ N+1 query problem (20 extra queries)</li>
        <li>✓ Optimized query with select_related</li>
        <li>✓ CPU-intensive computation (10,000 iterations)</li>
    </ul>
    
    <p><strong>Total Queries:</strong> {query_count}</p>
    <p><strong>Top Movies:</strong> {len(list(top_movies))} results</p>
    <p><strong>Computations:</strong> {len(results)} square roots calculated</p>
    
    <h3>View this request in Silk:</h3>
    <p><a href="/silk/" target="_blank">Open Silk Dashboard →</a></p>
    <p>Look for this request path: <code>/lab3/silk-demo/</code></p>
    
    <p><a href="/">← Back to Home</a></p>
    """
    return HttpResponse(result)


def cprofile_demo(request):
    """
    Lab 3: Demo view for cProfile profiling
    Run this with: python -m cProfile -o profile.stats manage.py runserver
    Or use @profile decorator if configured
    """
    reset_queries()
    
    def slow_function():
        """Intentionally slow function for profiling"""
        total = 0
        for i in range(100000):
            total += i ** 2
        return total
    
    def database_heavy():
        """Database-heavy function"""
        movies = Movie.objects.annotate(
            avg_rating=Avg('ratings__rating')
        ).filter(avg_rating__isnull=False)[:50]
        return list(movies)
    
    # Call functions
    computation_result = slow_function()
    db_results = database_heavy()
    
    query_count = len(connection.queries)
    
    result = f"""
    <h2>Lab 3: cProfile Demo</h2>
    <p>This view demonstrates function-level profiling with cProfile.</p>
    
    <h3>Operations Performed:</h3>
    <ul>
        <li><code>slow_function()</code> - CPU-intensive (100,000 iterations)</li>
        <li><code>database_heavy()</code> - Database query with aggregation</li>
    </ul>
    
    <p><strong>Computation Result:</strong> {computation_result}</p>
    <p><strong>Database Results:</strong> {len(db_results)} movies</p>
    <p><strong>Query Count:</strong> {query_count}</p>
    
    <h3>How to Profile:</h3>
    <pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;">
# Method 1: Using cProfile from command line
python -m cProfile -o profile.stats manage.py runserver

# Method 2: Using django-silk (already configured)
# Visit /silk/ to see detailed profiling

# Method 3: Using Django Debug Toolbar
# Check the toolbar on the right side of this page
    </pre>
    
    <p><a href="/silk/" target="_blank">View in Silk →</a></p>
    <p><a href="/">← Back to Home</a></p>
    """
    return HttpResponse(result)


def bottleneck_demo_before(request):
    """
    Lab 3 BONUS: Demonstrates a bottleneck - BEFORE optimization
    """
    reset_queries()
    start_time = time.time()
    
    # BOTTLENECK: Multiple separate queries instead of one
    movies = Movie.objects.all()[:50]
    results = []
    
    for movie in movies:
        # Each iteration triggers 2 queries (N+1 problem)
        rating_count = movie.ratings.count()
        avg_rating = movie.ratings.aggregate(Avg('rating'))['rating__avg']
        
        if avg_rating:
            results.append({
                'title': movie.title,
                'avg_rating': avg_rating,
                'count': rating_count
            })
    
    execution_time = time.time() - start_time
    query_count = len(connection.queries)
    
    result = f"""
    <h2>Lab 3 BONUS: Bottleneck Detection - BEFORE</h2>
    <p style="color: red;"><strong>⚠️ UNOPTIMIZED VERSION</strong></p>
    
    <h3>Performance Metrics:</h3>
    <ul>
        <li><strong>Execution Time:</strong> {execution_time:.4f} seconds</li>
        <li><strong>Query Count:</strong> {query_count} queries</li>
        <li><strong>Results:</strong> {len(results)} movies</li>
    </ul>
    
    <h3>Bottlenecks Identified:</h3>
    <ol>
        <li><strong>N+1 Problem:</strong> Fetching ratings for each movie separately</li>
        <li><strong>Redundant Queries:</strong> Calling count() and aggregate() separately</li>
        <li><strong>Missing Annotations:</strong> Not using annotate() for aggregations</li>
    </ol>
    
    <p><a href="/lab3/bottleneck-after/">See Optimized Version →</a></p>
    <p><a href="/">← Back to Home</a></p>
    """
    return HttpResponse(result)


def bottleneck_demo_after(request):
    """
    Lab 3 BONUS: Demonstrates optimization - AFTER fixing bottleneck
    """
    reset_queries()
    start_time = time.time()
    
    # OPTIMIZED: Single query with annotations
    movies = Movie.objects.annotate(
        avg_rating=Avg('ratings__rating'),
        rating_count=Count('ratings')
    ).filter(avg_rating__isnull=False).order_by('-avg_rating')[:50]
    
    results = [
        {
            'title': movie.title,
            'avg_rating': movie.avg_rating,
            'count': movie.rating_count
        }
        for movie in movies
    ]
    
    execution_time = time.time() - start_time
    query_count = len(connection.queries)
    
    # Compare with before (approximate)
    before_queries = 101  # 1 + 50*2
    improvement = ((before_queries - query_count) / before_queries) * 100
    
    result = f"""
    <h2>Lab 3 BONUS: Bottleneck Detection - AFTER</h2>
    <p style="color: green;"><strong>✅ OPTIMIZED VERSION</strong></p>
    
    <h3>Performance Metrics:</h3>
    <ul>
        <li><strong>Execution Time:</strong> {execution_time:.4f} seconds</li>
        <li><strong>Query Count:</strong> {query_count} queries</li>
        <li><strong>Results:</strong> {len(results)} movies</li>
    </ul>
    
    <h3>Optimizations Applied:</h3>
    <ol>
        <li><strong>annotate():</strong> Calculate avg and count in single query</li>
        <li><strong>Removed N+1:</strong> All data fetched in one query</li>
        <li><strong>Database-level aggregation:</strong> Let DB do the work</li>
    </ol>
    
    <h3>Improvement:</h3>
    <p style="font-size: 1.2em; color: green;">
        <strong>Query Reduction: {improvement:.1f}%</strong> 
        (from ~101 queries to {query_count})
    </p>
    
    <p><a href="/lab3/bottleneck-before/">← See Unoptimized Version</a></p>
    <p><a href="/">← Back to Home</a></p>
    """
    return HttpResponse(result)
