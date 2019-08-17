# Tech Stack

### Core platform and dev tools
- **NodeJS**
- **PostgreSQL**
- **Heroku**
- **nodemon.js**
- **ESLint.js**

### Common HTTP-server features
- **Express.js**            - Web application framework
- **Cors.js**            - Web application framework
- **Passport.js**           - Authentication middleware

### Data access, migrations and validation
- **Knex.js**               - SQL query builder
- **Pg.js**                 - PostgreSQL library
- **express-validator.js**  - Data validation

# Usage

Install dependencies with:
```
npm install
```
Run the server with:
```
npm start
```
Run development server with:
```
npm run dev
```
Run lint the code with:
```
npm run lint
```
Run lint fix with:
```
npm run fix
```
Create the database (given that you have postgresql installed with a valid user)
```
npm run create_db
```

# Setup

## Environment variables
- **ENVIRONMENT**: Sets which database configuration to use [development, staging, production]
- **PORT**: Sets which port is used for this server

## Original setup
```
npm install --save express cors passport
npm install --save pg knex express-validator
npm install nodemon --save-dev
npm install eslint --save-dev
```

### Original eslint setup
```
./node_modules/.bin/eslint --init
```
After selecting
- How would you like to use ESLint? **To check syntax, find problems, and enforce code style**
- What type of modules does your project use? **CommonJS (require/exports)**
- Which framework does your project use? **None of these**
- Where does your code run? **Browser**
- How would you like to define a style for your project? **Use a popular style guide**
- Which style guide do you want to follow? **Airbnb**
- What format do you want your config file to be in? **JavaScript**

After that, **eslint-config-airbnb-base@latest** dependencies were installed.

### Original knex setup
Knex initialized with:
```
sudo npm install -g knex
knex init
```
Create db migration with :
```
knex migrate:make example_migration
```
After editing the migration:
```
knex migrate:latest
```
To create a seed file, run:
```
knex seed:make 01_example_seed
```
To run seed files, execute:
```
knex seed:run
```
Seed files are executed in alphabetical order. Unlike migrations, every seed file will be executed when you run the command. You should design your seed files to reset tables as needed before inserting data.

To run a specific seed file, execute:
```
knex seed:run --specific=01_example_seed.js
```