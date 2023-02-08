from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer
from django.template import loader
from django.shortcuts import get_object_or_404,render
from .models import User, UserForm
from django.http import HttpResponse
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserList(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        print('here', serializer.errors)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    def get(self, request, pk, format=None):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)
    
    def put(self, request, pk):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        user = User.objects.get(pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # serializer_class = UserSerializer
    # queryset = User.objects.all()

    # def index(request):
    #     users = User.objects.all()
    #     context = {
    #         'users': users,
    #     }
    #     return render(request, 'index.html', context)

    # def edit(request, user_id):
    #     try:
    #         user = User.objects.get(pk=user_id)
    #         print(user)
    #     except User.DoesNotExist:
    #         raise Http404("User does not exist")
    #     form = UserForm(instance=user)
    #     print(form)
    #     context = {
    #         'user': user,
    #         "form": form,
    #     }
    #     return render(request, 'edit.html', context)

    # def add(request):
    #     form = UserForm()
    #     context = {
    #         "form": form,
    #     }
    #     return render(request, 'add.html', context)
