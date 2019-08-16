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

# Setup

## Original setup
```
npm install --save express cors passport
npm install --save pg knex express-validator
npm install nodemon --save-dev
npm install eslint --save-dev
```

## Original eslint setup
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