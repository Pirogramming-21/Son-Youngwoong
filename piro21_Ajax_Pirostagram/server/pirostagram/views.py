from django.shortcuts import render, redirect, get_object_or_404
from .forms import PostForm, SignUpForm
from django.contrib.auth import login, authenticate 
from django.http import JsonResponse
from .models import Post, Like, Comment
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST

def index(request):
    posts = Post.objects.all()
    return render(request, 'index.html', {'posts': posts})

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            login(request, user)
            return redirect('index')
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})


@login_required
def create_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user
            post.save()
            return redirect('index')
    else:
        form = PostForm()
    return render(request, 'create_post.html', {'form': form})

@login_required
@require_POST
def like_post(request):
    post_id = request.POST.get('post_id')
    post = get_object_or_404(Post, id=post_id)
    like, created = Like.objects.get_or_create(user=request.user, post=post)

    if not created:
        like.delete()
        liked = False
    else:
        liked = True

    return JsonResponse({'liked': liked, 'like_count': post.like_set.count()})

@login_required
@require_POST
def add_comment(request):
    post_id = request.POST.get('post_id')
    comment_text = request.POST.get('comment_text')
    post = get_object_or_404(Post, id=post_id)
    comment = Comment.objects.create(user=request.user, post=post, text=comment_text)

    return JsonResponse({
        'comment_id': comment.id,
        'comment_text': comment.text,
        'comment_user': comment.user.username,
        'comment_created_at': comment.created_at.strftime('%Y-%m-%d %H:%M:%S')
    })

@login_required
@require_POST
def delete_comment(request):
    comment_id = request.POST.get('comment_id')
    comment = get_object_or_404(Comment, id=comment_id)
    if comment.user == request.user:
        comment.delete()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False}, status=403)
