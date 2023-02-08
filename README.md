# teamify :rocket: :collision:

Full-stack Django/React application to manage team members.

## Getting Started Locally :ship:

1. Clone this repository with `git clone <repository-link>` and cd into the project root
2. Confirm your Python version >= 3.9.0: `python --version`
3. Confirm your Yarn version >= 1.22.11: `yarn --version`

### Backend Setup :floppy_disk:

1. `cd server` from the root project folder to move to the backend
2. Set up your virtual environment:
   1. Installation virtualenv: `pip install virtualenv`
   2. Initialize virtual environment: `python -m venv <virtual-env-name>`
   3. Activate virtual environment: `source <virtual-env-name>/bin/activate`
3. Install requirements.txt: `pip install -r requirements.txt`
4. Migrate database: `python manage.py migrate`
5. Run server: `python manage.py`

### Frontend Setup :computer:

1. `cd web` from the root project folder to move to the frontend
2. Install dependencies: `yarn`
3. Start server with Next.js: `yarn dev`
4. Go to http://localhost:3000 :chart_with_upwards_trend:
