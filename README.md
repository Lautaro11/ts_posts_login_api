openapi: 3.0.0
info:
  title: Posts
  version: '1.0'
servers:
  - url: 'http://localhost:4000/api'
paths:
  /user:
    parameters: []
    post:
      summary: Create User
      operationId: post-user
      responses:
        '200':
          description: OK
      description: Create a new user.
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                password:
                  type: string
        description: Post the necessary fields for the API to create a new user.
      tags:
        - User
    patch:
      summary: Update User Information
      operationId: patch-users-userId
      responses:
        '200':
          description: User Updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
              examples:
                example:
                  value:
                    id: string
                    username: string
                    password: stringst
                    description: string
        '404':
          description: User Not Found
        '409':
          description: Email Already Taken
      description: Update the information of an existing user.
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                description:
                  type: string
            examples:
              example:
                value:
                  username: string
                  description: string
        description: Patch user properties to update.
      security:
        - API_Token: []
      tags:
        - User
    delete:
      summary: Delete User
      operationId: delete-user-update
      responses:
        '200':
          description: OK
      description: Delete Logged User and their posts.
      security:
        - API_Token: []
      tags:
        - User
  /user/login:
    post:
      summary: Login
      operationId: post-user-login
      responses:
        '200':
          description: OK
      description: Login user.
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                password:
                  type: string
                  minLength: 8
              required:
                - username
                - password
        description: ''
      tags:
        - User
  /user/fetch:
    get:
      summary: Fetch Users
      tags:
        - User
      operationId: get-user-fetch
      description: Return all users
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    _id:
                      type: string
                    username:
                      type: string
                    createdAt:
                      type: string
                x-examples:
                  example-1:
                    - _id: string
                      username: string
                      createdAt: '2022-01-01T00:00:00.000Z'
                    - _id: string
                      username: string
                      createdAt: '2022-01-01T00:00:00.000Z'
              examples:
                example:
                  value:
                    - _id: string
                      username: string
                      createdAt: string
        '500':
          description: Unexpected Error
  '/user/getUser/{id}':
    get:
      summary: Get User
      responses: {}
      operationId: 'get-user-getUser-:id'
      description: Retrieve the information of the user with the matching user ID.
      tags:
        - User
    parameters:
      - schema:
          type: string
        name: id
        in: path
        required: true
        description: User Id
  /user/validateToken:
    get:
      summary: Validate Token
      tags:
        - User
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                x-examples:
                  example-1:
                    message: 'Welcome back {username}'
        '401':
          description: Unauthorized
        '404':
          description: User does not exist
      operationId: get-user-validateToken
      description: Retrieve the information of the Api Token.
      security:
        - API_Token: []
  /post:
    post:
      summary: Create Post
      operationId: post-post
      responses:
        '200':
          description: OK
      description: Create a new Post.
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                title:
                  type: string
                image:
                  type: string
                  description: Image Url
        description: |-
          Post the necessary fields for the API to create a new post.
          At least one field is required.
      security:
        - API_Token: []
      tags:
        - Post
  '/post/{id}':
    patch:
      summary: Update Post
      operationId: patch-post
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                  title:
                    type: string
                  ownerId:
                    type: object
                    properties:
                      id:
                        type: string
                      username:
                        type: string
                      description:
                        type: string
                  image:
                    type: string
                x-examples:
                  example-1:
                    id: string
                    title: string
                    ownerId:
                      id: string
                      username: string
                      description: string
                    image: string
              examples:
                example:
                  value:
                    id: string
                    title: string
                    ownerId:
                      id: string
                      username: string
                      description: string
                    image: string
      description: Update the information of an existing post.
      security:
        - API_Token: []
      tags:
        - Post
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                title:
                  type: string
                image:
                  type: string
              x-examples:
                example-1:
                  title: string
                  image: string
            examples:
              example:
                value:
                  title: string
                  image: string
        description: At least one field is required.
    parameters:
      - schema:
          type: string
        name: id
        in: path
        required: true
        description: Post Id
    delete:
      summary: Delete Post
      operationId: delete-post
      responses:
        '200':
          description: OK
      description: Delete Post.
      security:
        - API_Token: []
      tags:
        - Post
    get:
      summary: Get Post
      tags:
        - Post
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                  title:
                    type: string
                  ownerId:
                    type: object
                    properties:
                      username:
                        type: string
                      description:
                        type: string
                  image:
                    type: string
                x-examples:
                  example-1:
                    id: string
                    title: string
                    ownerId:
                      username: string
                      description: string
                    image: string
              examples:
                example:
                  value:
                    id: string
                    title: string
                    ownerId:
                      id: string
                      username: string
                      password: stringst
                      description: string
                    image: string
      operationId: get-post
      description: Retrieve the information of the post with the matching Post ID.
      parameters: []
  /post/fetchPosts:
    get:
      summary: Your GET endpoint
      tags:
        - Post
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    _id:
                      type: string
                    ownerId:
                      type: object
                      properties:
                        username:
                          type: string
                        createdAt:
                          type: string
                    title:
                      type: string
                    image:
                      type: string
                    createdAt:
                      type: string
                x-examples:
                  example-1:
                    - _id: string
                      ownerId:
                        username: string
                        createdAt: '2022-01-01T00:00:00.000Z'
                      title: string
                      image: string
                      createdAt: '2022-01-01T00:00:00.000Z'
                    - _id: string
                      ownerId:
                        username: string
                        createdAt: '2022-01-01T00:00:00.000Z'
                      title: string
                      image: string
                      createdAt: '2022-01-01T00:00:00.000Z'
                    - _id: string
                      ownerId:
                        username: string
                        createdAt: '2022-01-01T00:00:00.000Z'
                      title: string
                      image: string
                      createdAt: '2022-01-01T00:00:00.000Z'
              examples:
                example:
                  value:
                    - _id: string
                      ownerId:
                        username: string
                        createdAt: string
                      title: string
                      image: string
                      createdAt: string
      operationId: get-post-fetchPosts
      description: Get All Posts.
  '/post/fetchPosts/{ownerId}':
    get:
      summary: Your GET endpoint
      tags:
        - Post
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    _id:
                      type: string
                    ownerId:
                      type: object
                      properties:
                        username:
                          type: string
                        createdAt:
                          type: string
                    title:
                      type: string
                    image:
                      type: string
                    createdAt:
                      type: string
                x-examples:
                  example-1:
                    - _id: string
                      ownerId:
                        username: string
                        createdAt: '2022-01-01T00:00:00.000Z'
                      title: string
                      image: string
                      createdAt: '2022-01-01T00:00:00.000Z'
                    - _id: string
                      ownerId:
                        username: string
                        createdAt: '2022-01-01T00:00:00.000Z'
                      title: string
                      image: string
                      createdAt: '2022-01-01T00:00:00.000Z'
                    - _id: string
                      ownerId:
                        username: string
                        createdAt: '2022-01-01T00:00:00.000Z'
                      title: string
                      image: string
                      createdAt: '2022-01-01T00:00:00.000Z'
              examples:
                example:
                  value:
                    - _id: string
                      ownerId:
                        username: string
                        createdAt: string
                      title: string
                      image: string
                      createdAt: string
      operationId: get-post-fetchUserPosts
      description: Get All User Posts.
    parameters:
      - schema:
          type: string
        name: ownerId
        in: path
        required: true
        description: Post owner id
components:
  schemas:
    User:
      title: User
      type: object
      description: ''
      examples: []
      properties:
        id:
          type: string
          description: Unique identifier for the given user.
        username:
          type: string
          minLength: 1
          description: Public dentifier for the given user.
        password:
          type: string
          minLength: 8
          description: Password
        description:
          type: string
          maxLength: 50
          description: User description
      required:
        - id
        - username
        - password
    Post:
      title: Post
      x-stoplight:
        id: kny1chffbfq9m
      type: object
      properties:
        id:
          type: string
          description: Unique identifier for the given post.
        title:
          type: string
          description: Post title
        ownerId:
          $ref: '#/components/schemas/User'
          description: Id of the user who created the post
        image:
          type: string
          description: Url of the image
      required:
        - ownerId
  securitySchemes:
    API_Token:
      type: http
      scheme: bearer
      description: Put here your Api Token
security:
  - API_Token: []
