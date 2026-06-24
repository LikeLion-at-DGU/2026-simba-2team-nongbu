from django.shortcuts import render, redirect, get_object_or_404
from spaces.models import Space
from django.utils import timezone
from datetime import timedelta
import calendar
from spaces.constellation import CONSTELLATION_ORDER, CONSTELLATIONS
from spaces.views import get_daily_break_points

def memory_main(request):
    if not request.user.is_authenticated:
        return redirect('accounts:login')
    
    my_spaces = Space.objects.filter(members__user=request.user).order_by('-created_at')
    
    memories = []

    for space in my_spaces:
        end_date = space.created_at + timedelta(days=space.duration_days)
        if timezone.now() >= end_date:
            memories.append(space)

    return render(request, 'memory/memory_main.html', {'memories': memories})

def memory_gallery_list(request, space_id):
    space = get_object_or_404(Space, pk=space_id)
    today = timezone.now()
    year = int(request.GET.get('year', today.year))
    month = int(request.GET.get('month', today.month))
    cal = calendar.Calendar(calendar.SUNDAY)

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

    month_name = calendar.month_name[month].upper()
    days_list = []
    for week in cal.monthdatescalendar(year, month):  
        for day in week:                              
            days_list.append(day) 

    context = {
        'space_id': space_id,
        'space' : space,
        'current_year': year,
        'current_month': month,
        'month_name': month_name,
        'prev_year': prev_year,
        'prev_month': prev_month,
        'next_year': next_year,
        'next_month': next_month,
        'days_list': days_list,
    }
    return render(request, 'memory/memory_gallery_list.html', context)
                       


def memory_gallery(request, space_id):
    space = get_object_or_404(Space, pk=space_id)
    target_date = request.GET.get('target_date')
    memories = space.stars.all()

    if target_date:
        memories = memories.filter(created_at__date=target_date)
    
    memories = memories.order_by('-created_at')
    context = {
        'space': space,
        'target_date': target_date,
        'memories': memories, 
    }
    return render(request, 'memory/memory_gallery.html', context)



def memory_constellation(request, space_id):
    
    if not request.user.is_authenticated:
        return redirect('accounts:login')

   
    space = get_object_or_404(
        Space.objects.filter(
            members__user=request.user).distinct(),
        space_id=space_id
    )

   
    end_datetime = space.created_at + timedelta(
        days=space.duration_days
    )

    
    if timezone.now() < end_datetime:
        return redirect('memories:memory_main')

   
    stars = space.stars.order_by('created_at')


    total_memory_count = stars.count()
    break_points = get_daily_break_points(space)
    remain = total_memory_count
    render_constellations = []

    for name in CONSTELLATION_ORDER:
        constellation = CONSTELLATIONS[name]
        required = constellation["required"]

        current = min(remain, required)

        constellation_start_index = total_memory_count - remain

        filtered_lines = []

        for line in constellation["lines"]:
            start_index = constellation_start_index + line[0]
            end_index = constellation_start_index + line[1]

            is_broken = False

            for break_point in break_points:
                if min(start_index, end_index) < break_point <= max(start_index, end_index):
                    is_broken = True
                    break

            if not is_broken:
                filtered_lines.append(line)

        constellation_data = constellation.copy()
        constellation_data["lines"] = filtered_lines

        render_constellations.append({
            "name": name,
            "current": current,
            "required": required,
            "data": constellation_data,
            "start_date": space.created_at.strftime("%y.%m.%d"),
            "end_date": end_datetime.strftime("%y.%m.%d"),
        })

        remain -= current

        if remain <= 0:
            break

   
    return render(request, 'memory/memory_constellation.html', {
        'space': space,
        'stars': stars,
        'start_date': space.created_at.date(),
        'end_date': end_datetime.date(),
        'render_constellations': render_constellations, 
    })