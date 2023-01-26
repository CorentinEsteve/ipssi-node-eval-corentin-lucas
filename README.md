# Our CRUD Blog Application

## Authors
This project was built for IPSSI by Lucas Taranne & Corentin Esteve.

## Overview
This project is a CRUD blog application built with NodeJS, Express, and Prisma. The application allows users to create, read, update, and delete blog posts and comments. The application also has user authentication and authorization features.

It includes the following tables in the database: User, Post and Comment. A User can have multiple Posts and Comments, and a Comment belongs to only one Post. When a Post is deleted, the Comments are deleted too.

Users can sign up and log in to view Posts, and only the author of a Post and an admin can modify it. As required, posts can be sorted by date through a query parameter, for example by sending a GET request to `/api/posts?from=1674560065`, where the from parameter is a timestamp. Prisma is used to filter the Posts. Similarly, only the authors of Comments can modify or delete them, and an admin can also delete Comments.

The application also has a CRUD functionality for Users, only admins can delete other Users. Express-validator is used to validate requests.

The application is deployed on render.com, and the database is a PostgreSQL database hosted on the render.com platform.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
- NodeJS
- Express
- Prisma
- Express-validator
- An environment file with a `DATABASE_URL` variable that points to the database

## Installing
1. Clone the repository
`git clone https://github.com/CorentinEsteve/ipssi-node-eval-corentin-lucas.git`

2. Install the dependencies
`pnpm install`

3. Run the migrations
`pnpm prisma migrate`

4. Create the .env file
`DATABASE_URL="postgres://ipssi_express_test_user:2p38nHy2QgSlLu9peIWQXQXOLashSUgJ@dpg-cf7b5rcgqg47vk2ej8pg-a.frankfurt-postgres.render.com/ipssi_express_test"`, `JWT_SECRET="secret"`, but shhhh don't tell anyone.

5. Start the development server
`pnpm run dev`

## Application Routes

### User Routes
- `POST /api/users/signup`: Create a new user
- `POST /api/users/login`: Log in an existing user
- `DELETE /api/users/:id`: Delete an existing user (only for admin users)

Example of request body for creating a user:

`{
"username": "John",
"password": "CrazyPotatoJohn"
}`

### Post Routes
- `GET /api/posts`: Get all blog posts
- `GET /api/posts/:date`: Get all blog posts created after a specific date
- `POST /api/posts`: Create a new blog post
- `DELETE /api/posts/:uuid`: Delete an existing blog post
- `GET /api/posts/:id`: Retrieve a specific post
- `PUT /api/posts/:id`: Update a specific post (only allowed for the author of the post)
- `DELETE /api/posts/:id`: Delete a specific post (only allowed for the author of the post or users with the admin role)
- `GET /api/posts?from=1674560065`: Retrieve a list of all posts sorted by date, starting from the timestamp provided in the from query parameter

Example of request body for creating a post (user needs to be logged in):

`{
"title": "Hello World!",
"content": "This is my first blog post!"
}`

### Comment Routes
- `GET /api/comments`: Get all comments
- `GET /api/comments/:postId`: Get all comments for a specific post
- `POST /api/comments`: Create a new comment
- `DELETE /api/comments/:id`: Delete an existing comment (only for admin or the user who created the comment)
- `PUT /api/comments/:id`: Update an existing comment (only for the user who created the comment)

Example of request body for adding a comment (user needs to be logged in):

`{
"postId":"c445b4b3-e8af-47e1-9061-48e342ea0100",
"content": "This is a comment"
}`

## Conclusion

We hope you will enjoy using our API as much as we enjoyed building it. If you have any questions or need help, please don't hesitate to reach out to us. We are always available to help.

Thank you for using our application! 
