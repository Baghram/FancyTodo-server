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
    "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiRW1haWwiOiJ0ZXN0aW5nMUBtYWlsLmNvbSIsImlhdCI6MTU4NTU3Mjg5MCwiZXhwIjoxNTg1NTc2NDkwfQ.10ZoEx5rxsXbLF2I-aSkCPSvfYMXyHQsUrzk5xZDooA",(Expired in 1 Hour)
    "Email": "testing1@mail.com"
}

Error Response:
Code:400
{
    "type": "Bad request",
    "message": "Error Messages"
}


_____________________________________________________________________
Title
GetProject

URL

/projects

Method:

GET

URL Params

-

Required:

-Access_Token: String(From LocalStorage after Login,Expired in 1 hour)

Optional:

-

Data Params

-

Success Response:

Code: 200
Content: 
[
    {
        "UserId": 7,
        "ProjectId": 2,
        "createdAt": "2020-03-31T14:07:51.190Z",
        "updatedAt": "2020-03-31T14:07:51.190Z",
        "User": {
            "id": 7,
            "Email": "testing@mail.com",
            "Password": "$2a$05$z76ytNZgt4khH1A6Web1Z.Ev9jaSzmSFo5P673w2i9ggrBWbT9Xxm",
            "createdAt": "2020-03-30T11:27:37.602Z",
            "updatedAt": "2020-03-30T11:27:37.602Z"
        },
        "Project": {
            "id": 2,
            "UserId": 7,
            "Title": "Testing 123",
            "createdAt": "2020-03-31T14:07:51.089Z",
            "updatedAt": "2020-03-31T14:07:51.089Z"
        }
    },
    {
        "UserId": 7,
        "ProjectId": 3,
        "createdAt": "2020-03-31T14:09:36.774Z",
        "updatedAt": "2020-03-31T14:09:36.774Z",
        "User": {
            "id": 7,
            "Email": "testing@mail.com",
            "Password": "$2a$05$z76ytNZgt4khH1A6Web1Z.Ev9jaSzmSFo5P673w2i9ggrBWbT9Xxm",
            "createdAt": "2020-03-30T11:27:37.602Z",
            "updatedAt": "2020-03-30T11:27:37.602Z"
        },
        "Project": {
            "id": 3,
            "UserId": 7,
            "Title": "Testing 123",
            "createdAt": "2020-03-31T14:09:36.692Z",
            "updatedAt": "2020-03-31T14:09:36.692Z"
        }
    }
]

Error Response:
Code:400
{
    "type": "Bad request",
    "message": "Error Messages"
}


_____________________________________________________________________
Title
Add Projects

URL

/projects/add

Method:

POST

URL Params

-

Required:

-Access_Token: String(From LocalStorage after Login,Expired in 1 hour)

Optional:

-

Data Params

-

Success Response:

Code: 201
Content: 
{
    "payload": {
        "msg": "Add Project Success"
    },
    "result": {
        "UserId": 7,
        "ProjectId": 3,
        "updatedAt": "2020-03-31T14:09:36.774Z",
        "createdAt": "2020-03-31T14:09:36.774Z",
        "id": 3
    }
}

Error Response:
Code:400
{
    "type": "Bad request",
    "message": "Error Messages"
}


_____________________________________________________________________
Title
Delete Projects

URL

/projects/delete/:id

Method:

DELETE

URL Params

-

Required:

-Access_Token: String(From LocalStorage after Login,Expired in 1 hour)

Optional:

-

Data Params

-

Success Response:

Code: 201
Content: 
{
    "msg": "Successfully Deleted The Said Project"
}

Error Response:
Code:400
{
    "type": "Bad request",
    "message": "Error Messages"
}


_____________________________________________________________________
Title
Add Friends

URL

/projects/friend

Method:

POST

URL Params

-

Required:

-Access_Token: String(From LocalStorage after Login,Expired in 1 hour)

Optional:

-

Data Params

-Email:String(From Client),
-ProjectId:Integer(From Client)

Success Response:

Code: 201
Content: 
{
    "msg": "Successfully Added!!"
}

Error Response:
Code:400
{
    "type": "Bad request",
    "message": "Error Messages"
}

OR
Code:405
{
    "type": "Method Not Allowed",
    "message": "User Already Exist!!"
}

_____________________________________________________________________
Title
Delete Friends

URL

/projects/friend

Method:

DELETE

URL Params

-

Required:

-Access_Token: String(From LocalStorage after Login,Expired in 1 hour)

Optional:

-

Data Params

-Email:String(From Client),
-ProjectId:Integer(From Client)

Success Response:

Code: 201
Content: 
{
    "msg": "Successfully Removed the said Email"
}

Error Response:
Code:400
{
    "type": "Bad request",
    "message": "Error Messages"
}

OR
Code:405
{
    "type": "Method Not Allowed",
    "message": "User Already Exist!!"
}

_____________________________________________________________________
Title
GET Todo

URL

/projects/todos

Method:

GET

URL Params

-

Required:

-Access_Token: String(From LocalStorage after Login,Expired in 1 hour)

Optional:

-

Data Params

-ProjectId:Integer(From Client)

Success Response:

Code: 201
Content: 
{
    "msg": "Successfully Removed the said Email"
}

Error Response:
Code:400
{
    "type": "Bad request",
    "message": "Error Messages"
}

_____________________________________________________________________
Title
Add Todo

URL

/projects/todos

Method:

POST

URL Params

-

Required:

-Access_Token: String(From LocalStorage after Login,Expired in 1 hour)

Optional:

-

Data Params

-Title:String,
-Content:String,
-DueDate:Date,
-Status:Boolean,
-ProjectId:Integer(From Client),

Success Response:

Code: 201
Content: 
{
    "msg": "Successfully Created",
    "data": {
        "id": 1,
        "Title": "Testing todo",
        "Content": "Todo Test 123",
        "DueDate": "2020-04-04T17:00:00.000Z",
        "Status": false,
        "ProjectId": 2,
        "updatedAt": "2020-03-31T15:58:51.805Z",
        "createdAt": "2020-03-31T15:58:51.805Z"
    }
}

Error Response:
Code:400
{
    "type": "Bad request",
    "message": "Error Messages"
}

_____________________________________________________________________
Title
Update Todo

URL

/projects/todos

Method:

PATCH

URL Params

-

Required:

-Access_Token: String(From LocalStorage after Login,Expired in 1 hour)

Optional:

-

Data Params

-Title:String,
-Content:String,
-DueDate:Date,
-Status:Boolean,
-ProjectId:Integer(From Client),

Success Response:

Code: 201
Content: 
{
    "msg": "Successfully Updated",
    "data": [
        1
    ]
}

Error Response:
Code:400
{
    "type": "Bad request",
    "message": "Error Messages"
}

_____________________________________________________________________
Title
DELETE Todo

URL

/projects/todos

Method:

DELETE

URL Params

-

Required:

-Access_Token: String(From LocalStorage after Login,Expired in 1 hour)

Optional:

-

Data Params

-ProjectId:Integer(From Client),

Success Response:

Code: 201
Content: 
{
    "msg": "Successfully Deleted"
}

Error Response:
Code:400
{
    "type": "Bad request",
    "message": "Error Messages"
}

_____________________________________________________________________