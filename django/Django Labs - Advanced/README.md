# Django ORM Labs - MovieLens Dataset

## Setup

```bash
cd movieproject
pip install django django-debug-toolbar django-silk
python3 manage.py migrate
python3 manage.py load_data
python3 manage.py runserver
```

Visit: http://127.0.0.1:8000/

## Labs

### Lab 1: Query Optimization
- `/n-plus-one/` - N+1 problem (51 queries)
- `/optimized/` - Fixed with select_related (1 query)
- `/prefetch/` - prefetch_related demo (2 queries)

### Lab 2: Advanced ORM
- `/lab2/dynamic-filter/` - Q() expressions
- `/lab2/f-expression/` - F() updates
- `/lab2/only-defer/` - Field selection
- `/lab2/values-dict/` - Dictionary results
- `/lab2/values-list/` - Tuple results
- `/lab2/index-performance/` - Index comparison

### Lab 3: Monitoring
- `/lab3/silk-demo/` - Silk profiling
- `/lab3/cprofile-demo/` - cProfile demo
- `/lab3/bottleneck-before/` - Unoptimized (101 queries)
- `/lab3/bottleneck-after/` - Optimized (1 query)
- `/silk/` - Silk dashboard

**Monitoring Tools:**
- Debug Toolbar - Right side of any page
- Silk Dashboard - `/silk/`
