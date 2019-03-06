#
# These are settings for local development
#

from .common import *

#CORS_ORIGIN_ALLOW_ALL = True
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# It's okay to have secret key in plain text since it is
# different then the production environment key

SECRET_KEY = '9zctpkr-!f&#sefezepm!u8sjywo98h=bl8ecxdjutcf^z*et&'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'

# The necessary information for connecting to the
# the postgres database running on our local machine

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'test_db_yef',
        'USER': 'test_db_yef_user',
        'PASSWORD': 'test_db_yef_password',
        'HOST': 'localhost',
        'PORT': ''
    }
}

DEFAULT_RENDERER_CLASSES = DEFAULT_RENDERER_CLASSES + (
        'rest_framework.renderers.BrowsableAPIRenderer',
)

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': DEFAULT_RENDERER_CLASSES
}

CORS_ORIGIN_WHITELIST = (
    'localhost:3000',
)