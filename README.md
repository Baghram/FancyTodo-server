Title
Register

URL

/user/register

Method:

POST

URL Params

-

Required:

-

Optional:

-

Data Params

Email: "String",
Password: "String"

Success Response:

Code: 201
Content: 
{
    "message": "Register Success!!",
    "Email": "testing1@mail.com"
}
Error Response:
Code:400
{
    "type": "Bad Request",
    "message": "Error Messages"
}

_____________________________________________________________________
Title
Login

URL

/user/login

Method:

POST

URL Params

-

Required:

-

Optional:

-

Data Params

Email: "String",
Password: "String"

Success Response:

Code: 201
Content: 
{
    "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiRW1haWwiOiJ0ZXN0aW5nMUBtYWlsLmNvbSIsImlhdCI6MTU4NTU3Mjg5MCwiZXhwIjoxNTg1NTc2NDkwfQ.10ZoEx5rxsXbLF2I-aSkCPSvfYMXyHQsUrzk5xZDooA",
    "Email": "testing1@mail.com"
}

Error Response:
Code:400
{
    "type": "Bad request",
    "message": "Error Messages"
}


_____________________________________________________________________

