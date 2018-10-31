# YEF

JumboCode 2018-2019 project for Youth Educational Forum.

Team members:

- Manish Aryal
- Ben Ewing
- Carl Froneberger
- Andrew Gross
- Alessandra Jacimovic
- Panru Jing (Designer)
- Dan Katz (Project lead)
- Anita Lam
- Nivi Nath
- Meguna Okawa

## Overview

Three key parts:

### API

[Django](https://www.djangoproject.com/) REST API for all tournament operations. This interacts with the [PostgreSQL](https://www.postgresql.org/) database.

#### Routes:

/tournaments (GET) returns all tournaments with the following fields `'id', 'name', 'location', 'start_date', 'end_date', 'teams'`

/tournaments (POST) adds a tournament to the database. The fields in the request should be `'id', 'name', 'location', 'start_date', 'end_date', 'teams'`

/tournaments/<tournament_id> (GET) returns the tournament with the given id

/tournaments/<tournament_id> (PATCH) patches the tournament with the given id and the fields in the request. (This means the if you send a request with the following data `{"name":"New name", "location":"New location"}` the name and location of the tournament with id `<tournament_id>` will be updated

/teams (POST) adds a team to the database. The fields in the request should be `'name', 'city', 'clubName', 'member1', 'member2', 'member3', 'tournamentID'`

### Database

[PostgreSQL](https://www.postgresql.org/) database. Stores all data. (For later: add link to admin interface)

### Frontend

[React](https://facebook.github.io/react/docs/hello-world.html) application.

[Mockups](https://xd.adobe.com/view/079cf1b1-193d-480a-5cc2-bdd162119a3b-71ad/) 

## One time developer setup

How to get the code onto your computer

```
cd <PATH TO DIRECTORY YOU WANT CODE TO BE IN>
git clone https://github.com/JumboCode/YEF.git // This will create a directory called YEF
cd YEF
```

Next install system dependencies:
TODO: Add setup for non mac users if any on team

```
# MacOS
If you don't have homebrew installed:
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew install python3 node yarn

#Ubuntu
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install -y python3-pip python3-venv nodejs yarn


# All Platforms:
sudo pip3 install --upgrade pip
```

Next install project dependencies:

In the `frontend` directory you will need to run:

```
yarn
```

In the `backend` directory you will need to run:

```
python3 -m venv .venv
. .venv/bin/activate
pip install --upgrade pip setuptools
pip install -r requirements.txt
```

## Running the app

To run the frontend, go into the `react` directory and run:

```
npm start // This will run the frontend on port 3000
```

Then go to your web browser and enter `http://localhost:3000` in the address bar

To run the backend, go into the `backend` directory and run:

```
. .venv/bin/activate // This will activate the virtual environment
python manage.py runserver // This will run the backend on port 8000
```

## Developer workflow

When working on new features or bug fixes:

- Work on a feature branch (put the issue number in the branch name) `git checkout -b <branch_name>`
- When you are ready for the branch to become a merge request, add `fix #XX` (where XX is the issue number) to your git commit message, and it will create a new merge request.
- Have someone review your merge request, incorporate feedback
- Reviewer approves with a comment or GIF on the merge request on Github
- Merge your code
- When the branch is merged into master, the tests will run and if they pass, it will automatically be deployed to the production server
- Double check it's working in the production app.

Small/noisy commits are totally OK on the feature branches. When the branch is merged into master it will typically have 'squash commits'

## Helpful commands and solutions to common problems

Common Git commands

```
git add <path to file> // adds file to staging area
git add . // adds all files in current directory to staging area
git add -u // adds all already tracked files to staging area
git commit -m <commit message> // commits staged changes with given commit message
git push // pushes committed changes to remote repository
git pull // gets changes from remote repository
git status // shows changed files and whether or not they have been staged
git branch // shows all branches (there will be a * next to the current branch)
git checkout <branch name> // switches to pre-existing branch with name <branch_name>
git checkout -b <branch_name> // creates a new branch with name <branch_name> and switches to it
```

Common Frontend problems

Problem: `Error: Cannot find module <module_name>`

Solution: In the `frontend` directory run `yarn`

Why: This error means there is a node module that is referenced in the code that you haven't installed. Normally this is because someone added a new node module.

Common backend problems

Problem:

```
File "manage.py", line 14
    ) from exc
         ^
SyntaxError: invalid syntax
```

Solution: Activate your virtual environment by running `. .venv/bin/activate`

Why: The dependencies needed to run the backend are in the virtual environment, not your system environment

## Backend Models, Views, and Serializers

### Models

A model is Python class that represents a component of a database. Each model holds the essential
fields and behaviors of the data stored.

In this project, we have two main models:

- Tournament
- Team

Each of these contain their component fields and behaviors:

- Tournament - name - location - start date - end date

- Team - name - city - club name - member names - tournament ID - Each team points to a tournament but tournaments do not point to teams.

### Views

A view is Python function that takes a web request (a url) and returns a data in the form of a web page.

At this time in the project, we have two important views:

- Team View - Returns all the teams for viewing and editing. - Has a serializer class: TeamSerializer.

- Tournament View - Returns all the tournaments for viewing and editing. - Has a serializer class: TournamentSerializer.

### Serializers

A serializer is function that will take Django models/queries and will convert them into other datatypes.
In our case, our serializers convert our models in JSON objects.

At this time in the project, we have two important serializers:

- TeamSerializer - Converts the Team model into a JSON. - Has the fields of the Team model.

- TournamentSerializer - Converts the Tournament model into a JSON. - Has the fields of the Tournament model. - Returns associated teams and the tournament's ID.
