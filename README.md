# Latte-Machine React Frontend

[Demo](henryis.me/lattes)

![react-app](https://github.com/henryvalbuena/latte-machine/blob/master/frontend_react.gif)

This project is a refactoring of the [full-stack-project](https://github.com/henryvalbuena/full-stack-project) created for the Full-stack Nano Degree. The original project found in the previous link, was built using Angular.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Dependency

This frontend is part of a full-stack project (see [here](https://github.com/henryvalbuena/full-stack-project)). You will need to either setup a backend api or use the one provided in the previous link.

## Available Scripts

In the project directory, you can run:

-  `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

-  `yarn test`

-  `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### Installing Dependencies

#### Installing Node and NPM

This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

#### Installing project dependencies

This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the `root` directory of this repository. After cloning, open your terminal and run:

```bash
npm install
```

>_tip_: **npm i** is shorthand for **npm install**

### Authentication

The authentication system used for this project is Auth0. `./src/services/isAuthorized.js` contains the logic to check if the user is authorized to perform CRUD operations. After logging in through Auth0, the application manages the JWT token upon successful callback. This token is then consumed by our DrinkService (`./src/services/apiService.js`) and passed as an Authorization header when making requests to our backend.

### Authorization

The Auth0 JWT includes claims for permissions based on the user's role within the Auth0 system. This project makes use of these claims using the `token.contains('permission')` which checks if particular permissions exist within the JWT permissions claim of the currently logged in user. This logic is defined in  `./src/services/isAuthorized.js` and is then used to enable and disable buttons, form submissions, and perform CRUD operations in the `/lattes` route.

### Author
Henry Valbuena