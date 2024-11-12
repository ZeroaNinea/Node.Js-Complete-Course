const fs = require('fs');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const mysql = require('mysql');
// const app = require(`${__dirname}/app`);

const HOST = process.env.HOSTING;
const DB = process.env.DATABASE;
const LOGIN = process.env.DATABASE_LOGIN;
const PASSWORD = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize(DB, LOGIN, PASSWORD, {
	host: HOST,
	dialect: 'mysql',
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection successful!');
	})
	.catch((err) => {
		console.log(err);
		console.log('Error connecting to database!');
	});

// READ JSON FILE
const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

const Tours = require(`../../models/tourModel.js`);
console.log(Tours);
console.log(tours);

// tours.forEach((tour) => Tours.createEntry(tour));

// IMPORT DATA INTO DB
const importData = async () => {
	try {
		await tours.forEach((tour, id) => {
			Tours.createEntry(tour);
			id >= tours.length && process.exit();
		});
		console.log('Data successfully loaded!');
	} catch (err) {
		console.log(err);
	}
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
	try {
		await tours.forEach((tour, id) => {
			Tours.deleteTour(tour.id);
			id >= tours.length && process.exit();
		});
		console.log('Data successfully deleted!');
	} catch (err) {
		console.log(err);
	}
};

if (process.argv[2] === '--import') {
	importData();
} else if (process.argv[2] === '--delete') {
	deleteData();
}

console.log(process.argv);
