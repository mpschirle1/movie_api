# myFlix Movie API

## About

This is the server-side component of a “movies” web application called "myFlix". The web application provides users with access to information about different movies, directors, and genres. Users are to sign up, update their personal information, and create a list of their favorite movies. This REST API and database were built using JavaScript, Node.js, Express, and MongoDB. CRUD methods are used to retreive data from the database.

## Features

- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it’s featured or not) about a
single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister
- Allow users to see which actors star in which movies
- Allow users to view more information about different movies, such as the release date and
the movie rating

## Dependencies

<pre>
"bcrypt": "^5.0.1",
"body-parser": "^1.20.0",
"cors": "^2.8.5",
"express": "^4.18.1",
"express-validator": "^6.14.2",
"jsonwebtoken": "^8.5.1",
"lodash": "^4.17.21",
"mongoose": "^6.4.4",
"morgan": "^1.10.0",
"passport": "^0.6.0",
"passport-jwt": "^4.0.0",
"passport-local": "^1.0.0",
"uuid": "^8.3.2"
</pre>

## Application Links

myFlix React Client: https://myflix-react-application.netlify.app/ <br>
myFlix Angular Client: https://mpschirle1.github.io/myFlix-Angular-client/
