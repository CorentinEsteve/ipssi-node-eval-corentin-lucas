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

### User Routes
- ```POST /api/users/signUp```: Create a new user

`{
"username": "John",
"password": "CrazyPotatoJohn"
}`
- `POST /api/users/signIn`: Log in an existing user
- `DELETE /api/users/:id`: Delete an existing user (only for admin users)

Example of request body for creating a user:

`{
"username": "John",
"password": "CrazyPotatoJohn"
}`

You can use this one for admin permissions:
`{
"username": "admin",
"password": "admin"
}`

### Post Routes
- `GET /api/posts`: Get all blog posts
- `GET /api/posts/:timestamp`: Get all blog posts created after a specific date
- `POST /api/posts`: Create a new blog post
- `DELETE /api/posts/:uuid`: Delete an existing blog post
- `GET /api/posts/:id`: Retrieve a specific post
- `PUT /api/posts/:id`: Update a specific post
- `DELETE /api/posts/:id`: Delete a specific post

Example of request body for creating a post (after logging in):

`{
"title": "Hello World!",
"content": "This is my first blog post!",
"published": true
}`

### Comment Routes
- `GET /api/comments`: Get all comments
- `GET /api/comments/:postId`: Get all comments for a specific post
- `POST /api/comments`: Create a new comment
- `DELETE /api/comments/:id`: Delete an existing comment
- `PUT /api/comments/:id`: Update an existing comment

Example of request body for adding a comment (user needs to be logged in):

`{
"postId":"c445b4b3-e8af-47e1-9061-48e342ea0100",
"content": "This is a comment"
}`

## Conclusion

We hope you will enjoy using our API as much as we enjoyed building it. If you have any questions or need help, please don't hesitate to reach out to us. We are always available to help.

Thank you for using our API! 

## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
