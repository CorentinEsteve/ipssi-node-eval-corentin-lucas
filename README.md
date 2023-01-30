# Our CRUD Blog Application

## Authors
This project was built for IPSSI by Lucas Taranne & Corentin Esteve.

## Overview
This project is a CRUD blog application built with NodeJS, Express, and Prisma. The application allows users to create, read, update, and delete blog posts and comments. The application also has user authentication and authorization features.

It includes the following tables in the database: User, Post and Comment. A User can have multiple Posts and Comments, and a Comment belongs to only one Post. When a Post is deleted, the Comments are deleted too.

Users can sign up and log in to view Posts, and only the author of a Post and an admin can modify it. Posts can be sorted by date through a query parameter, for example by sending a GET request to `/api/posts?from=1674560065`, where the from parameter is a timestamp. Prisma is used to filter the Posts. Similarly, only the authors of Comments can modify or delete them, and an admin can also delete Comments.

The application also has a CRUD functionality for Users, only admins can delete other Users. Express-validator is used to validate requests.

The application is deployed on render.com, and the database works with PostgreSQL.

## Getting Started
These instructions will help you access our API, connect and create posts and comments.

## Prerequisites
- A computer turned on with internet access
- A mac, because macs work better
- An API development tool such as Postman or Insomnia

## Connecting to database

To connect to the database, you will need to use your API platform, the endpoint for the app on render.com is `https://ipssi-project-node-lucas-corentin.onrender.com`.

You can make requests such as GET, POST, PUT, DELETE to interact with the database. In the body of your request, you can include any necessary parameters or data needed for the specific request.

For example, to retrieve data from the database, you can make a GET request to the endpoint. To add data to the database, you can make a POST request to the endpoint with the necessary information in the request body.

## Application Routes

## User Routes

### Create a new user
POST Method
```HTML
  https://ipssi-project-node-lucas-corentin.onrender.com/signUp
```
Body
```JSON
{
  "username":"Pseudo",
  "password":"Monsupermotdepasse"
}
```
### Log in an existing user

POST Method
```HTML
  https://ipssi-project-node-lucas-corentin.onrender.com/signIn
```
Body
```JSON
{
  "username":"Pseudo",
  "password":"Monsupermotdepasse"
}
```
### Delete an existing user (only for admin users)

Méthode DELETE
```HTML
  https://ipssi-project-node-lucas-corentin.onrender.com/api/user/:id
```
## Post Routes

GET Method

### Get all blog posts
Méthode GET
```HTML
  https://ipssi-project-node-lucas-corentin.onrender.com/api/posts
```



### Get all blog posts created after a specific timestamp
GET Method
```HTML
  https://ipssi-project-node-lucas-corentin.onrender.com/api/posts/:timestamp
```



### Create a new blog post
POST Method
```HTML
  https://ipssi-project-node-lucas-corentin.onrender.com/api/posts
```
Body 
```JSON
{ 
"title": "Hello world!",
"content": "This is my first blog post!",
"published": true
}
```



### Update a specific post
PUT Method
```HTML
https://ipssi-project-node-lucas-corentin.onrender.com/api/posts/:id
```

Body
```JSON
{ 
"title": "Hello world 0 !",
"content": "This is my first blog post 0 !",
"published": false
}
```



### Delete a specific post
DELETE Method
```HTML
https://ipssi-project-node-lucas-corentin.onrender.com/api/posts/:id
```

## Comment Routes

### Create a new comment

POST Method
```HTML
https://ipssi-project-node-lucas-corentin.onrender.com/api/comment
```
```JSON
{
"postId":"d863dd2f-f8fb-453e-b44f-a04b6fec0960", 
"content": "This is a comment" 
}
```
### Update an existing comment

PUT Method
```HTML
https://ipssi-project-node-lucas-corentin.onrender.com/api/comment/:id
```
Body
```JSON
{
"content": "This is a comment" 
}
```
### Delete an existing comment

DELETE Method
```HTML
https://ipssi-project-node-lucas-corentin.onrender.com/api/comment/:id
```




## Conclusion

We hope you will enjoy using our API as much as we enjoyed building it. If you have any questions or need help, please don't hesitate to reach out to us. We are always available to help.

Thank you for using our API! 
