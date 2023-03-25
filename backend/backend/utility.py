
from urllib.parse import urlencode
from urllib.parse import quote
from django.conf import settings
from typing import Any
from rest_framework.reverse import reverse
from rest_framework.request import Request
mailjet = settings.MAILJET


class FakeStatus:
    status_code = 0


def send_message(email_to: str, subject: str, content: str, fakeEmail=True):
    data = {
        'Messages': [
            {
                "From": {
                    "Email": "djangotempmail@gmail.com",
                    "Name": "DjangoNoteEditor"
                },
                "To": [
                    {
                        "Email": f"{email_to}",
                        # "Name": f"{username}"
                    }
                ],
                "Subject": subject,
                "TextPart": content,

            }
        ]
    }

    if fakeEmail:

        print(
            f"""
        from:djangotempmail@gmail.com
        
        to:{email_to}

        subject:{subject}

        {content}

        """
        )

        return FakeStatus
    else:
        return mailjet.send.create(data=data)


def reverse_with_query_parms(viewname, args=None, kwargs=None, request=None, format=None,  query_parms: dict[str, str] | None = None, **extra):

    query_url_section = "?" + \
        urlencode(query_parms) if query_parms is not None else ""

    url_without_query = reverse(
        viewname, args, kwargs, request, format, **extra)

    url = url_without_query + query_url_section

    return url
