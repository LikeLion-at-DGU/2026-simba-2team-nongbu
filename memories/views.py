from django.shortcuts import render, redirect
from spaces.models import Space
from django.utils import timezone
from datetime import timedelta

def memory_main(request):
    if not request.user.is_authenticated:
        return redirect('accounts:login')
    
    spaces = Space.objects.filter(members__user=request.user)
    
    memories = []

    for space in spaces:
        end_date = space.created_at + timedelta(days=space.duration_days)
        if timezone.now() >= end_date:
            memories.append(space)

    print("\n" + "="*40)
    print(f"현재 로그인한 유저: {request.user}")
    print(f"추억에 담긴 우주 개수: {len(memories)}개")
    
    for memory in memories:
        print(f"방 이름: {memory.name}")
    print("="*40 + "\n")


    return render(request, 'memory/memory_main.html', {'memories': memories})
