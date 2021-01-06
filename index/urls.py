#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.conf.urls import url
from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index),
    url(r'^huawei.html', views.index000001, name="huawei"),
    # path('<year>/<int:month>/<slug:day>', views.mydate)
    re_path('(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<day>[0-9]{2}).html', views.mydate),
    re_path('(?P<year>[0-9]{4}).html', views.myyear, name='myyear'),
    re_path('dict/(?P<year>[0-9]{4}).htm', views.myyear_dict, {'month': '05'}, name='myyear_dict'),

    # download视图
    path('download.html', views.download),

    path('login.html', views.login001),

    # filter的视图
    url(r'^filter.html', views.filter_index, name="filter_index"),

    # 通用视图ListView
    # path('index/', views.ProductList.as_view()),

    path('index/<id>.html', views.ProductList.as_view(), {'name': 'phone'}),

    path('index01.html', views.index01, name='index01'),

    # cookie的使用
    re_path(r'^login/', views.login),
    re_path(r'^index/', views.index),
    re_path(r'^logout/', views.logout),

    # 表单的使用
    url(r'^index_2021', views.index_2021, name="index_2021"),

    path('<int:id>.html', views.models_index)
]
