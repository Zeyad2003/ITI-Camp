import csv
import os
from django.core.management.base import BaseCommand
from movies.models import Movie, Rating, Tag, Link
from django.conf import settings


class Command(BaseCommand):
    help = 'Load data from CSV files into database'
    
    def handle(self, *args, **options):
        # Path to CSV files
        base_path = '/home/zeyad/Downloads/Django Labs/Movie db'
        
        self.stdout.write('Loading movies...')
        self.load_movies(os.path.join(base_path, 'movies.csv'))
        
        self.stdout.write('Loading ratings...')
        self.load_ratings(os.path.join(base_path, 'ratings.csv'))
        
        self.stdout.write('Loading tags...')
        self.load_tags(os.path.join(base_path, 'tags.csv'))
        
        self.stdout.write('Loading links...')
        self.load_links(os.path.join(base_path, 'links.csv'))
        
        self.stdout.write(self.style.SUCCESS('Successfully loaded all data!'))
    
    def load_movies(self, filepath):
        Movie.objects.all().delete()
        movies = []
        with open(filepath, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                movies.append(Movie(
                    movie_id=int(row['movieId']),
                    title=row['title'],
                    genres=row['genres']
                ))
        Movie.objects.bulk_create(movies)
        self.stdout.write(f'Loaded {len(movies)} movies')
    
    def load_ratings(self, filepath):
        Rating.objects.all().delete()
        ratings = []
        with open(filepath, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                ratings.append(Rating(
                    user_id=int(row['userId']),
                    movie_id=int(row['movieId']),
                    rating=float(row['rating']),
                    timestamp=int(row['timestamp'])
                ))
                # Batch insert every 5000 records for memory efficiency
                if len(ratings) >= 5000:
                    Rating.objects.bulk_create(ratings)
                    ratings = []
            
            # Insert remaining ratings
            if ratings:
                Rating.objects.bulk_create(ratings)
        
        self.stdout.write(f'Loaded ratings')
    
    def load_tags(self, filepath):
        Tag.objects.all().delete()
        tags = []
        with open(filepath, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                tags.append(Tag(
                    user_id=int(row['userId']),
                    movie_id=int(row['movieId']),
                    tag=row['tag'],
                    timestamp=int(row['timestamp'])
                ))
        Tag.objects.bulk_create(tags)
        self.stdout.write(f'Loaded {len(tags)} tags')
    
    def load_links(self, filepath):
        Link.objects.all().delete()
        links = []
        with open(filepath, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                links.append(Link(
                    movie_id=int(row['movieId']),
                    imdb_id=row['imdbId'],
                    tmdb_id=row['tmdbId'] if row['tmdbId'] else None
                ))
        Link.objects.bulk_create(links)
        self.stdout.write(f'Loaded {len(links)} links')
