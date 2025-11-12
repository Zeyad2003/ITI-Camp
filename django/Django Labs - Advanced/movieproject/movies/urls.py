from django.urls import path
from . import views

urlpatterns = [
    # Home
    path('', views.home, name='home'),
    
    # Lab 1: Query Optimization
    path('n-plus-one/', views.n_plus_one_problem, name='n_plus_one'),
    path('optimized/', views.optimized_query, name='optimized'),
    path('prefetch/', views.prefetch_example, name='prefetch'),
    
    # Lab 2: Advanced ORM Features
    path('lab2/dynamic-filter/', views.dynamic_filter_q, name='dynamic_filter'),
    path('lab2/f-expression/', views.f_expression_update, name='f_expression'),
    path('lab2/only-defer/', views.only_defer_demo, name='only_defer'),
    path('lab2/values-dict/', views.values_dict_demo, name='values_dict'),
    path('lab2/values-list/', views.values_list_demo, name='values_list'),
    path('lab2/index-performance/', views.index_performance_test, name='index_performance'),
    
    # Lab 3: Monitoring & Profiling
    path('lab3/silk-demo/', views.silk_demo, name='silk_demo'),
    path('lab3/cprofile-demo/', views.cprofile_demo, name='cprofile_demo'),
    path('lab3/bottleneck-before/', views.bottleneck_demo_before, name='bottleneck_before'),
    path('lab3/bottleneck-after/', views.bottleneck_demo_after, name='bottleneck_after'),
]

