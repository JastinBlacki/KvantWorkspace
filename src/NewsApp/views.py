from django.http import HttpResponse
from CoreApp.services.access import (KvantTeacherAndAdminAccessMixin,
                                     KvantWorkspaceAccessMixin)
from CoreApp.services.objects import CreateOrUpdateObject
from django.views import generic

from . import services
from .forms import KvantNewsFilesSaveForm, KvantNewsSaveForm
from .models import KvantNews


class MainPageTemplateView(KvantWorkspaceAccessMixin, generic.TemplateView):
    """ Контроллер главной новостной страницы """
    template_name = 'NewsApp/MainPage/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['max_news'] = services.getNewsCount()
        
        # if user.permission == 'Ученик': 
        #     context['courses'] = KvantCourse.objects.filter(students=user)
        # elif user.permission == 'Учитель': 
        #     context['courses'] = KvantCourse.objects.filter(teacher=user)
        
        return context


class NewsDetailView(services.NewsExistsMixin, generic.DetailView):
    """ Контроллер детального просмотра новостей """
    model               = KvantNews
    pk_url_kwarg        = 'news_identifier'
    context_object_name = 'news';
    template_name       = 'NewsApp/NewsDetailView/index.html'


class NewsListView(KvantWorkspaceAccessMixin, generic.ListView):
    """ Контроллер для организации пагинации по новостям """
    model               = KvantNews
    ordering            = ['-date', '-id']
    paginate_by         = 6
    template_name       = 'NewsApp/NewsPreview/index.html'
    context_object_name = 'all_news'


class NewsCreateView(KvantTeacherAndAdminAccessMixin, generic.View):
    """ Контроллер создания новости """
    def post(self, request, *args, **kwargs):
        object_creator = CreateOrUpdateObject(
            [KvantNewsSaveForm, KvantNewsFilesSaveForm])
        news_or_errors = object_creator.createObject(request)
        return services.NewsObjectManupulationResponse().getResponse(request, news_or_errors)


class NewsUpdateView(services.NewsAccessMixin, generic.View):
    """ Контроллер редактирования новости """
    def post(self, request, *args, **kwargs):
        news = services.getNewsById(kwargs.get('news_identifier'))
        object_creator = CreateOrUpdateObject(
            [KvantNewsSaveForm, KvantNewsFilesSaveForm], object=news)
        news_or_errors = object_creator.updateObject(request)
        return services.NewsObjectManupulationResponse().getResponse(request, news_or_errors)


class NewsDeleteView(services.NewsAccessMixin, generic.View):
    """ Контроллер удаления новости """
    def post(self, request, *args, **kwargs):
        services.getNewsById(kwargs.get('news_identifier')).delete()
        return HttpResponse({'status': 200})
        