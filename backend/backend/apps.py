from django.apps import AppConfig
from django.conf import settings


class BackendConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend'

    def ready(self) -> None:
        super().ready()
        CRONJOBS = [
            ('*/1 * * * *', 'backend.cron.remove_unactive_accounts')
        ]

        settings.CRONJOBS += CRONJOBS
