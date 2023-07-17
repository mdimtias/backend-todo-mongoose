# Backend Todo App with Mongoose

This repository contains the code for a backend todo application implemented using Mongoose, a MongoDB object modeling tool. This application provides APIs for managing todo items, allowing users to create, retrieve, update, and delete tasks.

## Features
* Create a new todo item
* Retrieve a list of all todo items
* Retrieve a specific todo item by ID
* Update a todo item
* Delete a todo item

## Getting Started
### Prerequisites
Before running this application, ensure that you have the following installed:

* Node.js (version 12 or higher)
* MongoDB (make sure it's running on your local machine or provide the appropriate connection URI)

## Installation
1. Clone this repository to your local machine:
```
git clone https://github.com/mdimtias/backend-todo-mongoose.git
```
2. Navigate to the project's root directory:
```
cd backend-todo-mongoose
```
3. Install the dependencies:
```
npm install
```
4. Create a .env file in the root directory and provide the following variables:
```
JWT_SECRET
```

## Usage 

5. To start the application, run the following command in the project's root directory:
```
npm start
```

The application will start on the specified port, and you can now access the API endpoints using a tool like Postman or cURL.

## Technologies
The following technologies were used in this project:

* Node.js - JavaScript runtime environment
* Express - Web application framework
* Mongoose - MongoDB object modeling tool
* MongoDB - NoSQL database
* dotenv - Environment variable management

## License
This project is licensed under the MIT License. Feel free to use and modify this code as per the license terms.

