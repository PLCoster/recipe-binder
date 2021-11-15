# Recipe Binder

## About

Love to cook but struggle to keep all your favourite recipes in one place? Recipe-Binder aims to solve that by being an easy way to store, search and share your favourite recipes!

**Recipe-Binder is an MVP project built during a three-day sprint - more features are planned in the future!**

## Built With

Front-End:

- React
- React-Router
- Bootstrap
- FontAwesome
- Embedded Javascript Templating
- Webpack

Back-End:

- Express.js
- Multer
- Bcrypt
- MongoDB database queried via Mongoose ODM

## Features

- Sign Up / Login:
  - Users can create a new account via the Sign Up page, and once an account is successfully created, can log in via the log in page. If there is an issue with a user's credentials, they are returned to the corresponding page with an informative message.
  - Logged in users are subsequently authenticated using session cookies if they visit the site again without logging out.
  - User's passwords are hashed using Bcrypt before being stored in the MongoDB database. On subsequent log in attempts, the entered passwords are hashed and compared to the stored hash.
- Home / Recipe-Binder View:
  - After logging in users are taken to the main page of the site, which displays all the recipes they have saved in their own recipe binder. Recipes are displayed using Bootstrap cards in a responsive grid layout.
- Create Recipe View:
  - Clicking the 'Create a New Recipe' button in the nav-bar displays a form that users can fill in to create a new recipe in their binder. They can enter details in various fields including Title, Description, Ingredients.
  - Optionally users can upload an image of their recipe which will be displayed on the Recipes' card on the Home view.
- Recipe Detail View:
  - When a user selects a recipe from their binder they are taken to a page showing the full details of that specific recipe.
  - When viewing the details of a recipe, users are also presented with the option to either update or delete the recipe they are viewing.

## Startup:

This project runs in Node.js, and utilises Node package manager.

To run this project, first clone this repo, then install the required dependencies:

`npm install`

Startup the development server:

`npm run dev`

The site can now be viewed at `http://localhost:8080/` in the browser.

Alternatively create a production build by running:

`npm run build`

`npm run start`

The site can then be viewed at `http://localhost:3000/` in the browser
