from django.shortcuts import render, get_object_or_404
from .models import Book, Author
from django.http import Http404, HttpResponse

# Create your views here.
def book_list(request):
    books = Book.objects.all()
    if not books.exists():
        raise Http404("No books found.")
    return render(request, 'library/book_list.html', {'books': books})


def book_detail(request, pk):
    book = get_object_or_404(Book, pk=pk)
    try:
        if not book.author:
            raise Exception("This book has no author.")
    except Exception as e:
        return HttpResponse("Error: NOT FOUND!!")
    return render(request, 'library/book_detail.html', {'book': book})


def author_detail(request, pk):
    author = get_object_or_404(Author, pk=pk)
    return render(request, 'library/author_detail.html', {'author': author})
