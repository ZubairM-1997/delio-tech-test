# Delio Node Technical Test

## The task 📈

Delio engineering have been tasked with checking the current price of APPL and MSFT shares and comparing them to the previous day's closing price.

## Requirements 🗃️

Your job is to create a web application that uses the Finnhub API (https://finnhub.io/docs/api/quote) to compare the current price of 10 APPL and 10 MSFT shares with their previous day's closing price. 

To complete this task, you'll need to:

* Create a API web application with Node & TypeScript
* Retrieve share value of MSFT and APPL shares from finnhub
* Store share values in a database
* Read the values from the database and run profit & loss calculation on both MSFT & APPL shares
* Return profit & loss values via a rest endpoint
* Add tests

## How to submit 🔗

- Share a link to a public or private repository on GitHub.


## How to start
1) First, we have to install the dependancies, which can easily done by entering 'yarn install' on the terminal
2) Secondly, make sure you have postgres and pgAdmin (or an alternative) installed on your local machine
3) You should create a database within the postgres shell, then enter the relevant environment variables within .env and config/config.json
4) To create the migrations within your database, enter 'yarn migrate' (to rollback the migration, enter 'yarn rollback')
5) start the development server by entering 'yarn dev' which will start the server on localhost:7000
6) To run the tests, enter the command 'yarn test' on the terminal

## Reasoning for using Postgres
Most financial institutions use PostgreSQL for their systems as they follow the ACID principles. Since this project is finance-based, it just made sense for me to follow that pattern.

## Bonus Features 
1) /currentCheapestStock - finds out the cheapest stock from database from their current price
2) /mostFluctuating - finds out the most volatile stock from database from their percentage change value
3) /highestOpenPrice - finds out which stock has the highest opening price from the database

## Considerations for Improvement
If this application has the potential to scale, I can see how adding a cacheing layer like Redis would be beneficial 

There would be 2 strategies that would be optimal in my view

1) Cache-Aside Pattern, where the application code always communicates with the cache but not the database, the benefit being, as soon as data is read from database, the application code caches the data, so the next time, if the same data is being requested, then the application reads from the cache, which will improve perfomance, an advantage of that would be that if the cacheing layer fails, the application as a whole will not fail.

2) Write Around Pattern
This is when the cacheing layer sits directly between the application code and database, however this strategy works if the application is write heavy, for this MVP, we are just reading into the database mainly (theres only 2 instances of writing into the database when the server is starting). So this strategy for now, would be a bit overkill



PS: If you come across any Typescript errors that state sequelize isn't being imported / sequelize module cannot be found, just simply uninstall it by entering 'yarn remove sequelize' then install it by entering 'yarn add sequelize'. Further investigation needed why this error was occuring

## Technologies used
1) Express.js
2) Node.js
3) Mocha.js
4) Chai.js
5) PostgreSQL
6) Sequelize