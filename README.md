# teamify :rocket: :collision: https://www.teamify.site

Full-stack Django/React application to manage team members.

## Getting Started Locally :ship:

1. Clone this repository with `git clone <repository-link>` and cd into the project root
2. Confirm your Python version >= 3.9.0: `python --version`
3. Confirm your Yarn version >= 1.22.11: `yarn --version`
4. Confirm your PostgreSQL version >= 14: `psql --version`

### Backend Setup :floppy_disk:

1. `cd teamify/server` from the root project folder to move to the backend
2. Set up your psql table:
   1. `brew services start postgresql` to start running postgres
   2. `psql -U postgres` to go into the postgres terminal interface
   3. `CREATE DATABASE teamifydb;` to create the required database
   4. `\l` and confirm the list of returned database names includes teamifydb
   5. `\q` to quit the terminal interface and retur back to `/server` directory
3. Set up your virtual environment:
   1. Installation virtualenv: `pip install virtualenv`
   2. Initialize virtual environment: `python -m venv <your-virtual-env-name>`
   3. Activate virtual environment: `source <your-virtual-env-name>/bin/activate`
4. Install requirements.txt: `pip install -r requirements.txt`
5. Migrate database: `python manage.py migrate`
6. Run server: `python manage.py runserver`
7. Go to http://localhost:8000/api/users to confirm the server is running

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

## Deployment

I deployed my frontend using Vercel, and my backend using Digitalocean. Vercel is the creator of Next.js, and so it was the most intuitive choice to host my frontend Next.js app. When deploying my backend, I chose a Digitalocean droplet with Dokku. Dokku allows me to containerize my backend configuration with Docker and link it to a postgres database without too much hassle.

## Error Handling :white_check_mark:

I implemented error handling in all forms. Every form field in the add and delete pages check for valid input, and show error messages under text fields that need to be updated.

## Google Maps API :earth_americas:

For the location field in the user form, I thought it would be helpful for the user to have autocompletion using teh Google maps API. This was a fairly minor adjustment, but I think it really helps improve UX of the product!

## Responsive Design :iphone:

Although there was no referene to responsive design in the project requirements document, I implemented the UI to account for desktop, mobile, and even iPad users. This was not too much extra work and would make a big difference had this been a real product.

## How much time I spent :clock1:

Building the app took me about 10 hours in total. I also went a little overboard and containerized my app using docker for fun, and that took me another 2 hours.
