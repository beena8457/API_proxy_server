# API Proxy Server

## Description
This project is a simple Node.js server that proxies requests to the GitHub API. It allows you to fetch details about GitHub users by their username with added rate limiting, caching, and error handling. The project also includes a simple frontend to input a GitHub username and display the fetched user data.

## Features
- **Express Server**: Handles HTTP requests and responses.
- **CORS**: Cross-Origin Resource Sharing is enabled for all routes.
- **Rate Limiting**: Limits clients to 5 requests per minute per IP to avoid overloading the server.
- **API Caching**: Caches responses from the GitHub API for 5 minutes to reduce API call frequency.
- **Proxy**: Uses the GitHub API to retrieve user details and adds an authorization header with a token.
- **Frontend**: A simple form to input GitHub usernames and display their details (name, location, public repos) on the webpage.

## Technologies Used
- **Node.js**
- **Express.js**
- **Needle** (for making HTTP requests to the GitHub API)
- **Express-rate-limit** (for rate limiting)
- **Apicache** (for caching)
- **CORS**
- **Dotenv** (for environment variable management)
- **Frontend**: HTML, JavaScript 

## Installing dependies using commands
-npm init
-npm install apicache cors dotenv express express-rate-limit needle
-npm install --save-dev nodemon


## Run the server
-npm start(In package.json enter start:"node index",
    "test": "jest",
    "dev": "nodemon index", in script)
## Open a browser and visit http://localhost:3000.


