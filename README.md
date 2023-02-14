# teamify :rocket: :collision:

Full-stack Django/React application to manage team members.

## Getting Started Locally :ship:

1. Clone this repository with `git clone <repository-link>` and cd into the project root
2. Confirm your Python version >= 3.9.0: `python --version`
3. Confirm your Yarn version >= 1.22.11: `yarn --version`
4. Confirm your PostgreSQL version >= 14: `psql --version`

### Backend Setup :floppy_disk:

1. `cd teamify/server` from the root project folder to move to the backend
2. Set up your virtual environment:
   1. Installation virtualenv: `pip install virtualenv`
   2. Initialize virtual environment: `python -m venv <virtual-env-name>`
   3. Activate virtual environment: `source <virtual-env-name>/bin/activate`
3. Install requirements.txt: `pip install -r requirements.txt`
4. Migrate database: `python manage.py migrate`
5. Run server: `python manage.py runserver`

### Frontend Setup :computer:

1. `cd teamify/web` from the root project folder to move to the frontend
2. Install dependencies: `yarn`
3. Start server with Next.js: `yarn dev`
4. Go to http://localhost:3000 :chart_with_upwards_trend:

## Navigating the code :mag:

- `/server` is my backend and is implemented using the Django REST framework, which connects to my PostgreSQL database.
  - `/server/users/test.py` is where my unit tests are located.
  - `/server/users/views.py` holds all my API routes for get, post, put, and delete requests. I am using the APIView import from Django REST framework to accept API requests.
- `/web` contains all of my frontend code, which is build with a React framework called Next.js, a UI framework called ChakraUI, and Yarn.
  - `/web/pages` contains my add, edit, and home pages.
  - `/web/api/user.js` holds all of my API requests to my Django server.
  - `/web/components` are my reusable custom components.
  - `/web/utils` hold my utility function for validation and error mapping.

## Running Django Tests :battery:

1. `cd teamify/server`
2. `python manage.py test`

## Error Handling :white_check_mark:

I implemented error handling in all forms. Every form field in the add and delete pages check for valid input, and show error messages under text fields that need to be updated.

## Responsive Design :iphone:

Although there was no referene to responsive design in the project requirements document, I implemented the UI to account for desktop, mobile, and even iPad users. This was not too much extra work and would make a big difference had this been a real product.

## How much time I spent :clock1:

Building the app took me about 10 hours in total. I also went a little overboard and containerized my app using docker for fun, and that took me another 2 hours.
