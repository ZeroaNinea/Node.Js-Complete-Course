const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mysql = require('mysql');
const app = require('./app');

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

// const Tours = sequelize.define('tours', {
// 	name: {
// 		type: Sequelize.DataTypes.STRING,
// 		allowNull: false,
// 		validate: {
// 			notNull: { msg: 'A tour must have a name!' },
// 		},
// 		unique: true,
// 	},
// 	rating: {
// 		type: Sequelize.DataTypes.FLOAT,
// 		defaultValue: 4.5,
// 	},
// 	price: {
// 		type: Sequelize.DataTypes.INTEGER,
// 		allowNull: false,
// 		validate: {
// 			notNull: { msg: 'A tour must have a price!' },
// 		},
// 	},
// }); // Create a table.

// Tours.sync()
// 	.then((data) => {
// 		console.log('Table and model syned successfully!');
// 	})
// 	.catch((err) => {
// 		console.log('Error syncing the table and model!');
// 	}); // Connect to the database.

// Tours.sync({ alter: true })
// 	.then(() => {
// 		const tour = Tours.build({
// 			name: 'The Park Camper',
// 			// rating: 4.7,
// 			price: 997,
// 		});
// 		return tour.save();
// 	})
// 	.then((data) => {
// 		console.log('Tour added to database!');
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	}); // This should be deleted.

// const connection = mysql.createConnection({
// 	host: HOST,
// 	user: LOGIN,
// 	password: PASSWORD,
// 	database: DB,
// 	connectionLimit: 10,
// }); // Create connection by MySQL module.

// connection.connect(function (err) {
// 	if (err) throw err;
// 	console.log('Connected!');
// }); // Commit connection.

// connection.query(`select * from tours`, (err, result, fields) => {
// 	if (err) throw err;

// 	console.log(result);
// });

// console.log(mysql);

// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
