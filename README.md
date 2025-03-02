# Express using typescript

This is a project using Express.js with TypeScript. The application is set up to use TypeORM for interacting with MySQL databases and other useful tools for web application development.

## Scripts

- `dev`: Starts the server in development mode with `nodemon`, watching for changes in TypeScript files.
`npm run dev`
- `build`: Compiles the TypeScript code into JavaScript using the TypeScript compiler (`tsc`).
`npm run build`
- `start`: Starts the production server by executing the compiled JavaScript file.
`npm start`

## Dependencies

### Main Dependencies

-   `bcryptjs`: For password hashing.
-   `class-transformer`: For transforming objects between classes.
-   `class-validator`: For class and object validation.
-   `dotenv`: For managing environment variables.
-   `express`: The web framework for Node.js.
-   `express-ts`: A wrapper for Express with TypeScript support.
-   `mysql2`: MySQL client for Node.js.
-   `reflect-metadata`: Required for reflection in TypeScript.
-   `typeorm`: ORM (Object Relational Mapper) for working with databases.


### Development dependencies

-   `@types/bcryptjs`: TypeScript types for `bcryptjs`.
-   `@types/express`: TypeScript types for `express`.
-   `@types/node`: TypeScript types for Node.js.
-   `nodemon`: A tool to automatically restart the server during development.
-   `ts-node`: Allows running TypeScript files directly.
-   `typescript`: The TypeScript language.

## Installation

To install the project dependencies, run:
`npm install`

## Usage

1.  **Development**: To start the server in development mode, run:
        `npm run dev` 
    
2.  **Build**: To compile the project into JavaScript, run:   
    `npm run build` 
    
3.  **Production**: To start the server in production, run:
            `npm start`