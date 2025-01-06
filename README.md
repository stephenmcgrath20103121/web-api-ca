# Assignment 2 - Web API.

Name: Stephen McGrath

## Features.
 
 + Many API calls handled by custom backend
 + Protected routes added; users must sign in/up
 + Users' favourite movies are stored in the MongoDB Database
 + Users now have their own individual favourite movies page

## Setup requirements.

+ Refer to README in react-movies to set up frontend app
+ Run 'npm install' in react-movies and movies-api
+ Run 'npm install dotenv' in react-movies and movies-api
+ Run 'npm start' in react-movies
+ Run 'npm run dev' in movie-api

## API Configuration

Create .env files in react-movies and movies-api

Enter the following in react-movies/.env
______________________
REACT_APP_TMDB_KEY= YourTMDBKey
FAST_REFRESH=false
______________________

Enter the following in movies-api/.env
______________________
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB= YourMongoURL
TMDB_KEY= YourTMDBKey
secret= YourJWTSecret
______________________

## API Design

- /api/movies/tmdb/discover?page=${page} | GET | Gets discover movies 
- /api/movies/tmdb/upcoming?page=${page} | GET | Gets upcoming movies 
- /api/movies/tmdb/popular?page=${page} | GET | Gets popular movies 
- /api/movies/tmdb/topRated?page=${page} | GET | Gets top rated movies 
- /api/movies/tmdb/trending | GET | Gets trending movies 
- /api/movies/${id} | GET | Gets a single movie 
- /api/movies/tmdb/genres | GET | Gets all movie genres
- /api/movies/images/${id} | GET | Gets images for a given movie
- /api/movies/reviews/${id} | GET | Gets reviews for a given movie
- /api/actors/${id} | GET | Gets a single actor
- /api/actors/images/${id} | GET | Gets images of a given actor
- /api/movies/actors/${id} | GET | Gets movies featuring a given actor
- /api/favourites/movies/${username} | GET | Gets a user's favourited movies
- /api/favourites/movies/${username} | PUT | Updates a user's favourited movies 
- /api/users | POST | Log in to an account
- /api/users?action=register | POST | Sign up for a new account

## Security and Authentication

- Users log in and sign up through POST endpoints
- All routes except for log in and sign up pages are protected
- JWT tokens are issued once users log in, allowing them access to the protected routes
- Password are hashed and salted before they are stored on MongoDB for security purposes
- Usernames must contain a letter, number and symbol and must be at least 8 characters long

## Integrating with React App

- Views integrated with the Web API are listed in the above 'API Design' section
- Some features (eg. pagination) were rewritten to accommodate the new infrastructure
- Most API calls are implemented in the Web API
- Frontend makes calls to backend Web API, which makes calls to TMDB API and MongoDB as needed
- Collections are stored in MongoDB for users and their favourite movies
