from django.shortcuts import render

# Create your views here.

def reiview_list(request):
    return render(request, 'review_list.html', {})