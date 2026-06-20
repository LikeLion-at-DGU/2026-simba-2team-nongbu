from django.shortcuts import render, redirect
from spaces.models import Space
from django.utils import timezone
from datetime import timedelta
import calendar

def memory_main(request):
    if not request.user.is_authenticated:
        return redirect('accounts:login')
    
    my_spaces = Space.objects.filter(members__user=request.user)
    
    memories = []

    for space in my_spaces:
        end_date = space.created_at + timedelta(days=space.duration_days)
        if timezone.now() >= end_date:
            memories.append(space)

    # 테스트코드 ==============================
    print("\n" + "="*40)
    print(f"현재 로그인한 유저: {request.user}")
    print(f"추억에 담긴 우주 개수: {len(memories)}개")
    
    for memory in memories:
        print(f"방 이름: {memory.name}")
    print("="*40 + "\n")
    # 테스트코드 ==============================

    return render(request, 'memory/memory_main.html', {'memories': memories})

def memory_calendar(request):
    today = timezone.now()
    year = int(request.GET.get('year', today.year))
    month = int(request.GET.get('month', today.month))
    cal = calendar.Calendar(calendar.MONDAY)

    prev_month = month - 1
    prev_year = year
    if prev_month == 0:
        prev_month = 12
        prev_year -= 1

    next_month = month + 1
    next_year = year
    if next_month == 13:
        next_month = 1
        next_year += 1

    result = [] # 최종 달력 한 주씩 2차원배열
    for week in cal.monthdatescalendar(year, month):
        week_list = [] 

        for day in week:
            formatted_day = day.strftime("%d") 
            week_list.append(formatted_day)

        result.append(week_list)


def memory_gallery(request):
    return render(request, 'memory/memory_gallery.html')