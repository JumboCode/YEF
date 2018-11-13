from django.contrib import admin
from api.models import Team, Tournament, Round, MemberPoints, JudgePoints, MatchUp, Judge, Member, Club

# Register your models here.
admin.site.register(Tournament)
admin.site.register(Team)
admin.site.register(Round)
admin.site.register(MemberPoints)
admin.site.register(JudgePoints)
admin.site.register(MatchUp)
admin.site.register(Judge)
admin.site.register(Member)
admin.site.register(Club)
