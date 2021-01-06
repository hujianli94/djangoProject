#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django import template

# 什么一个模板对象，称为注册过滤器
register = template.Library()


# 声明并定义过滤器
@register.filter
def myreplace(value, args):
    oldValue = str(args).split(':')[0]
    newValue = str(args).split(':')[1]
    return str(value).replace(oldValue, newValue)
