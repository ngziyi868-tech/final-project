# Recipe Tracker

Recipe Tracker is a full-stack web application that allows users to create, view, edit, and delete recipes. The application was created using React and Vite for the frontend, Node.js and Express for the backend,
and Firebase for authentication and data storage. Users can create an account, log in securely, and access a protected recipe page where they can manage their recipes.

## Project Description

The purpose of Recipe Tracker is to provide users with a simple and organized way to keep track of their favorite recipes. Users must be authenticated before accessing the main recipe page. Once logged in, users
can add new recipes by entering a recipe name, ingredients, and cooking instructions. Existing recipes can be viewed, edited, or deleted. The application also includes confirmation before deleting a recipe to
help prevent accidental deletion.

## Technologies Used

The frontend was built with React and Vite. React Router is used to manage navigation between the login, registration, and protected recipe pages. Firebase Authentication is used to securely manage user accounts
and login sessions. The backend was created with Node.js and Express, while Firebase Firestore is used to store recipe data. The Firebase Admin SDK allows the backend to securely communicate with Firebase and 
verify authenticated users. CSS is used throughout the application to create a clean, responsive, and user-friendly interface.

## Authentication

Recipe Tracker uses Firebase Authentication for user registration and login. When a user logs in, Firebase provides the frontend with an authentication ID token. The frontend sends this token to the backend with
recipe requests using a Bearer authorization header. The backend uses Firebase Admin to verify the token before allowing the request to continue. This protects the recipe API so that only authenticated users can
access it. Users can also log out, which ends their authenticated session.

## CRUD Functionality

The application includes a complete CRUD API for recipes. Users can create recipes using `POST /api/recipes`, retrieve recipes using `GET /api/recipes`, update existing recipes using `PUT /api/recipes/:id`, and
delete recipes using `DELETE /api/recipes/:id`. These operations are connected directly to the React frontend, allowing users to manage their recipes without manually interacting with the database.
When a recipe is created, updated, or deleted, the frontend updates the displayed recipe list to reflect the change.

## API

The backend API runs locally on port 5000. The main recipe endpoint is `/api/recipes`. A GET request to `/api/recipes` retrieves the recipes stored in Firestore. A POST request to `/api/recipes` creates a new 
recipe and requires a request body containing the recipe title, ingredients, and instructions. A PUT request to `/api/recipes/:id` updates an existing recipe using its Firestore document ID. A DELETE request to
`/api/recipes/:id` removes the selected recipe from the database. All recipe endpoints require a valid Firebase authentication token.

## Setup Instructions

To run the project locally, first install Node.js and npm. Clone the repository and open the project folder in a terminal. Navigate into the `frontend` directory and run `npm install` to install the frontend
dependencies. Then navigate into the `backend` directory and run `npm install` to install the backend dependencies. Firebase must also be configured for both the frontend and backend, including Firebase 
Authentication and Firestore. The backend requires the appropriate Firebase service account configuration and environment variables.

After installing the dependencies and configuring Firebase, start the backend by navigating to the `backend` directory and running `npm run dev`. The backend will run on `http://localhost:5000`. In a separate
terminal, navigate to the `frontend` directory and run `npm run dev`. Vite will provide a local URL, normally `http://localhost:5173`, where the application can be opened in a web browser.

## Using the Application

When the application is opened for the first time, users can create an account through the registration page. After registering, the user is taken to the protected recipe page.
Users can then create recipes by entering the recipe name, ingredients, and instructions. Recipes are displayed on the page after they are retrieved from the backend. Each recipe includes options to edit or
delete it. Editing allows the user to change the recipe information, while deleting requires confirmation before the recipe is permanently removed. The logout button ends the user's session and returns them to 
the login page.

## Project Structure

The project is organized into separate frontend and backend directories. The frontend contains the React pages, components, authentication context, Firebase configuration, and styling. The backend contains the 
Express application, server, recipe controllers, authentication middleware, recipe routes, and Firebase Admin configuration. This structure separates the user interface from the API and database functionality
while allowing the two parts of the application to communicate through HTTP requests.

## Security

Authentication is handled through Firebase rather than storing passwords directly in the application. The backend does not allow recipe API requests without a valid Firebase ID token. Environment variables and
Firebase credentials should be kept private and should not be committed to a public repository.

## Final Project

The application, Recipe Tracker demonstrates a complete full-stack application with authentication, protected routes, database integration, CRUD functionality, form validation, error messages, delete confirmation, and a responsive user interface.
