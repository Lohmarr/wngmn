# Wingman - MERN Stack Application

Wingman is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It is a dating app designed for birds, by birds.

[Heroku Deployment](https://wngmn-72e58af3a89c.herokuapp.com)

## Features

- User registration and authentication
- User profiles with updatable information
- Personal posts to display on user profiles
- Love calculator for finding compatible partners
- Ability to like and remove your likes from other birds
- Migration pattern filtering for finding birds on the same path
- Responsive design for mobile and desktop devices
- Randomly generated seeded database so you aren't alone while perusing the demo

## Technologies Used

- MongoDB: NoSQL database for storing user and bird data
- Express.js: Backend framework for handling HTTP requests and routes
- React.js: Frontend library for building user interfaces
- Node.js: JavaScript runtime environment for server-side development
- GraphQL: Query language for interacting with the backend API
- Apollo Server: GraphQL server for handling data fetching and mutations
- JWT: JSON Web Tokens for user authentication and authorization
- React Router: Routing library for navigating between pages
- Heroku: Cloud platform for deploying and hosting the application

## Running Application Locally

1. Clone the repository: `git clone https://github.com/your-username/wingman.git`
2. Install dependencies: `npm run install`
3. Seed the database: `npm run seed`
4. Start the development server: `npm run develop`
5. Open the application in your browser: `http://localhost:3000`

## Folder Structure

- `client`: Frontend codebase built with React.js
- `server`: Backend codebase built with Node.js and Express.js
- `models`: Database models
- `schemas`: GraphQL resolvers and typeDefs
- `utils`: Auth information, mutations, and queries
- `config`: Configuration files for environment variables

## Credits

Credit to [Jameson Suttles](https://github.com/Jsuttle2) for the Wingman logo
