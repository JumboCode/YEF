# YEF

JumboCode 2018-2019 project for Youth Educational Forum, led by Dan Katz.

## Overview

Three key parts:

### API

[Django](https://www.djangoproject.com/) REST API for all tournament operations. This interacts with the [PostgreSQL](https://www.postgresql.org/) database.

### Database

[PostgreSQL](https://www.postgresql.org/) database. Stores all data. (For later: add link to admin interface)

### Frontend

[React](https://facebook.github.io/react/docs/hello-world.html) application.

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

# All Platforms:
sudo pip3 install --upgrade pip
```

In the `backend` directory you will need to run:

```
python3 -m venv .venv
. .venv/bin/activate
pip install --upgrade pip setuptools
pip install -r requirements.txt
```

In the `frontend` directory you will need to run:

```
yarn
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
