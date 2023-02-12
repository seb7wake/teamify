from django.test import TestCase
from rest_framework.test import APIClient
from urllib.parse import urlencode
from users.models import User

mock_user = {
    'email': 'test@test.com', 
    'first_name': 'test', 
    'last_name': 'test', 
    'location': 'test, test', 
    'phone_number': '1234567890',
    'is_admin': False
}

class TestUser(TestCase):
    def setup(self):
        self.client = APIClient()
    
    def add_test_user(self):
        user = User.objects.create(
            email=mock_user['email'],
            first_name=mock_user['first_name'],
            last_name=mock_user['last_name'],
            location=mock_user['location'],
            phone_number=mock_user['phone_number'],
            is_admin=mock_user['is_admin']
        )
        user.save()
        return user.id

    def test_users_are_empty(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])
    
    def test_user_error(self):
        response = self.client.get('/api/users/1/')
        self.assertEqual(response.status_code, 404)
    
    def test_user_create(self):
        response = self.client.post('/api/users/', mock_user)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['email'], mock_user['email'])
        self.assertEqual(response.data['first_name'], mock_user['first_name'])
        self.assertEqual(response.data['last_name'], mock_user['last_name'])
        self.assertEqual(response.data['location'], mock_user['location'])
        self.assertEqual(response.data['phone_number'], mock_user['phone_number'])
        self.assertEqual(response.data['is_admin'], mock_user['is_admin'])
    
    def test_users_are_not_empty(self):
        self.add_test_user()
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
    
    def test_user_exists(self):
        user_id = self.add_test_user()
        response = self.client.get("/api/users/{}/".format(user_id))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['email'], mock_user['email'])
        self.assertEqual(response.data['first_name'], mock_user['first_name'])
        self.assertEqual(response.data['last_name'], mock_user['last_name'])
        self.assertEqual(response.data['location'], mock_user['location'])
        self.assertEqual(response.data['phone_number'], mock_user['phone_number'])
        self.assertEqual(response.data['is_admin'], mock_user['is_admin'])
    
    def test_user_update(self):
        user_id = self.add_test_user()
        mock_user['email'] = 'seb7wake@gmail.com'
        response = self.client.put(
            path="/api/users/{}/".format(user_id), 
            data=urlencode(mock_user), 
            content_type = 'application/x-www-form-urlencoded'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['email'], mock_user['email'])
    
    def test_user_delete(self):
        user_id = self.add_test_user()
        response = self.client.delete("/api/users/{}/".format(user_id))
        self.assertEqual(response.status_code, 204)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])
