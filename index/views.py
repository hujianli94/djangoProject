import csv
import datetime

from django.shortcuts import render, redirect
from django.http import HttpResponse, request
from django.views.generic import ListView
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
# def index(request):
#     return HttpResponse('Hello world')
from index.models import Product


def mydate(request, year, month, day):
    return HttpResponse(str(year) + "/" + str(month) + "/" + str(day))


def myyear(request, year):
    return render(request, 'myyear.html')


def myyear_dict(request, year, month):
    return render(request, 'myyear_dict.html', {'month': month})


def download(request):
    response = HttpResponse(content_type="text/csv")
    response['Content-Disposition'] = 'attachment; filename="somefilename.csv"'
    writer = csv.writer(response)
    writer.writerow(['First row', 'A', 'B', 'C'])
    return response


def index000001(request):
    return render(request, 'index.html', context={'title': '首页'}, status=500)


def index01(request):
    return render(request, 'index01.html')


def login001(request):
    if request.method == "POST":
        name = request.POST.get('name')
        # 相对地址，代表首页地址
        return redirect('/')
    else:
        if request.GET.get('name'):
            name = request.GET.get('name')
        else:
            name = 'Everyone'
        return HttpResponse('username is: ' + name)


class ProductList(ListView):
    # context_object_name设置Html模版的变量名称
    context_object_name = 'type_list'
    # 设定HTML模版
    template_name = 'index.html'
    # 查询数据
    queryset = Product.objects.values('type').distinct()

    # # # 重写 get_queryset 方法，对模型product进行数据筛选。
    # def get_queryset(self):
    #     type_list = Product.objects.values('type').distinct()
    #     return type_list

    # 添加其他变量
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['name_list'] = Product.objects.values('name', 'type')
        # print(context)
        return context

    def get_queryset(self):
        # 获取URL的变量id
        print(self.kwargs['id'])

        if self.request.GET.get('name'):
            self.kwargs['name'] = self.request.GET.get('name')
        # 获取URL的参数name
        print(self.kwargs['name'])

        # 获取请求方式
        print(self.request.method)
        type_list = Product.objects.values('type').distinct()
        return type_list


# 用户登录
@csrf_exempt
def login(request):
    print("COOKIES", request.COOKIES)
    print("SESSION", request.session)
    if request.method == "POST":
        name = request.POST.get("user")
        pwd = request.POST.get("pwd")
        if name == "huxiaojian" and pwd == "admin#123":
            # COOKLE SESSION
            request.session["is_login"] = True
            request.session["user"] = name

            return redirect("/index/")
    return render(request, "login.html")


# 登录之后进行跳转
@csrf_exempt
def index(request):
    if request.session.get("is_login", None):
        name = request.session.get("user", None)
        return render(request, "index001.html", locals())
    else:
        return redirect("/login/")


# # 注销动作
def logout(request):
    del request.session['user']  # 删除session
    # return HttpResponse('logout ok!')
    return redirect("/login/")


# 自定义的过滤器views
def filter_index(request):
    type_list = Product.objects.values('type').distinct()
    name_list = Product.objects.values('name', 'type')
    context = {'title': '首页', 'type_list': type_list, 'name_list': name_list}
    return render(request, 'django_index.html', context=context, status=500)
    # return render(request, 'django_index.html', locals(), status=500)


from .form import *


def index_2021(request):
    # GET请求
    if request.method == "GET":
        product = ProductFrom()
        return render(request, 'data_form.html', locals())
    # POST请求
    else:
        product = ProductFrom(request.POST)
        if product.is_valid():
            name = product['name']
            cname = product.cleaned_data['name']
            return HttpResponse("提交成功")
        else:
            # 将错误以json格式输出
            error_msg = product.errors.as_json()
            print(error_msg)
            return render(request, 'data_form.html', locals())


def models_index(request, id):
    if request.method == 'GET':
        instance = Product.objects.filter(id=id)
        # 判断数据是否存在
        if instance:
            product = ProductModelForm(instance=instance[0])
        else:
            product = ProductModelForm()
        return render(request, 'data_form.html', locals())
    else:
        product = ProductModelForm(request.POST)
        if product.is_valid():
            # 获取weight的数据，并通过clean_weight进行清洗，转换成Python数据类型
            weight = product.cleaned_data['weight']
            # 数据保存方法一
            # 直接将数据保存到数据库
            product.save()
            # save方法设置commit=False，将生成数据库对象product_db，然后对该对象的属性值修改并保存
            # product_db = product.save(commit=False)
            # product_db.name = '我的iPhone'
            # product_db.save()

            # 数据保存方法三
            # save_m2m()方法用于保存ManyToMany的数据模型
            # product.save_m2m()

            # return HttpResponse('提交成功！weight清洗后的数据为：' + weight)
            new_page = int(id) + 1
            return redirect(str(new_page) + ".html")
        else:
            # 将错误信息输出，error_msg是将错误信息以json格式输出
            error_msg = product.errors.as_json()
            print(error_msg)
            return render(request, 'data_form.html', locals())
