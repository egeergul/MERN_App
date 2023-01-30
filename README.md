# MERN_exercise

This is a project for me to learn the MERN stack. MERT stands for
* MongoDB
* Express
* React
* Node.js

In this project, the frontend side (client folder) uses React, and Axios to communicate with the server.

The backend side of the project (server folder) uses Express and Node.js. As an online database, I used MongoDB. To manage the MongoDB, mongoose is being used in the project.

# Pre-requisits for installation
In this project, I used MongoDB. However, to install the application and being able to successfully run it, you will need your own MongoDB account and you need to create a project with it. Then, to connect it
to the application, you need to change the .env.example file to .env file, and also add the connection url of your mongoDB project url to that file. Also for the
client side of the project, if you want the Google sign-in feature to work, you will need a Google Cloud account and will need to connect it to the app. 

# Installation
The application can be installed and used by downloading the repository. 

## npm install
The necessary dependencies can be downloaded with the npm install command. You need to run this command under both the client and the server folders.

## npm start
To run the application, run npm start command under both the client and the server folders. Prefer to start the server folder first.
