from django.contrib import admin
from api.models import Team, Tournament, Round, MemberPoint, JudgePoint, MatchUp, Judge, Member, Club

# Register your models here.
admin.site.register(Tournament)
admin.site.register(Team)
admin.site.register(Round)
admin.site.register(MemberPoint)
admin.site.register(JudgePoint)
admin.site.register(MatchUp)
admin.site.register(Judge)
admin.site.register(Member)
admin.site.register(Club)
