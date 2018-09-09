# YEF

JumboCode 2018-2019 project for Youth Educational Forum, led by Dan Katz.

## Overview

Three key parts:

### API

[Flask](https://www.djangoproject.com/) REST API for all tournament operations. This interacts with the [PostgreSQL](https://www.postgresql.org/) database.

### Database

[PostgreSQL](https://www.postgresql.org/) database. Stores all data. (For later: add link to admin interface)

### Frontend

[React](https://facebook.github.io/react/docs/hello-world.html) application.

## One time developer setup

First install system dependencies:

```
# MacOS
brew install python3 yarn

# All Platforms:
sudo pip3 install --upgrade pip
```

In the `backend` directory you will need to run:

```
python3 -m venv .venv
. .venv/bin/activate if running bash
pip install --upgrade pip setuptools
pip install -r requirements.txt
```

In the `frontend` directory you will need to run:

```
yarn
```
