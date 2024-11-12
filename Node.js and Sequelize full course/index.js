const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
const bcrypt = require("bcrypt");
const zlib = require("zlib");

const sequelize = new Sequelize("sequelize_video_db", "root", "", {
	host: "localhost",
	port: 3306,
	dialect: "mysql",
	logging: false,
	// define: {
	// 	freezeTableName: true,
	// },
}); // Connect the database.

// sequelize.drop({ match: /_test$/ }); // Sequelize will delete every table whose name ends with "_test".

const User = sequelize.define(
	"user",
	{
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true, // This is just an autoincrement.
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4, 6],
			},
			// get() {
			// 	const rawValue = this.getDataValue("username");
			// 	return rawValue.toUpperCase(); // Return capitalized "username" from the database.
			// },
		},
		password: {
			type: DataTypes.STRING,
			// set(value) {
			// 	const salt = bcrypt.genSaltSync(12);
			// 	const hash = bcrypt.hashSync(value, salt);
			// 	this.setDataValue("password", hash);
			// }, // Hash the password.
		},
		age: {
			type: DataTypes.INTEGER,
			defaultValue: 21,
			validate: {
				// isNumeric: true,
				// isNumeric: {
				// 	msg: "You must enter a number for age!",
				// },
				// isIn: {
				// 	args: ["me@soccer.org", "me@soccer.com"],
				// 	msg: "The provided email be one of the following...",
				// },
				myEmailValidator(value) {
					if (value === null) {
						throw new Error("Please enter an email!");
					}
				},
			},
		},
		WittCodeRocks: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		description: {
			type: DataTypes.STRING,
			// set(value) {
			// 	const compressed = zlib.deflateSync(value).toString("base64");
			// 	this.setDataValue("description", compressed);
			// },
			// get() {
			// 	const value = this.getDataValue("description");
			// 	const uncompressed = zlib.inflateSync(
			// 		Buffer.from(value, "base64"),
			// 	);
			// 	return uncompressed.toString();
			// },
		},
		aboutUser: {
			type: DataTypes.VIRTUAL,
			get() {
				return `${this.username} ${this.description}`;
			},
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			// validate: {
			// 	isIn: ["me@soccer.org", "me@soccer.com"],
			// },
			timestamps: true,
			validate: {
				usernamePassMatch() {
					if (this.username === this.password) {
						throw new Error("Password cannot be your username!");
					} else {
						console.log("Soccer");
					}
				},
			},
			paranoid: true,
		},
	},
	{
		freezeTableName: true, // All tables will use the same name as the model name.
		timestamps: false, // Delete the date recordings.
	},
); // Define a table.

function myFunction() {
	console.log("RUNNING SQL STATEMENT!");
}

User.sync({ alter: true })
	.then(() => {
		// working with our updated table.
		// return User.findAll({
		// 	attributes: [
		// 		"username",
		// 		[sequelize.fn("SUM", sequelize.col("age")), "sum_age"],
		// 	],
		// });
		// return User.findAll({
		// 	where: {
		// 		age: {
		// 			[Op.or]: {
		// 				[Op.lt]: 45,
		// 				[Op.eq]: null,
		// 			},
		// 		},
		// 	},
		// });
		// return User.findAll({
		// 	where: sequelize.where(
		// 		sequelize.fn("char_length", sequelize.col("username")),
		// 		8,
		// 	),
		// });
		// return User.update({ username: "pizza" }, { where: { age: 25 } });
		// return User.update(
		// 	{ username: "Yes!" },
		// 	{
		// 		where: {
		// 			age: {
		// 				[Op.gt]: 1,
		// 			},
		// 		},
		// 	},
		// );
		// return User.destroy({ truncate: true });
		// return User.sum("age", { where: { age: 21 } });
		// return User.findAndCountAll({
		// 	where: { username: "WittCo" },
		// 	raw: true,
		// });
		// return User.create({
		// 	username: "mike",
		// 	password: "mike",
		// 	age: "31",
		// 	// email: "me@soccer12.org",
		// });
		// return sequelize.query(
		// 	`SELECT * FROM user WHERE username LIKE :username`,
		// 	{
		// 		replacements: { username: "Witt%" },
		// 	},
		// );
		return sequelize.query(`SELECT * FROM user LIMIT 1`);
	})
	.then((data) => {
		// [results, metadata] = data;
		// const { count, rows } = data;
		// console.log(count);
		// console.log(rows);
		console.log(data);
		// console.log(data.username);
		// console.log(data.password);
		// console.log(data.description);
		// console.log(data.aboutUser);
		// console.log(data.toJSON());
		// console.log(result);
		// console.log(metadata);
		// console.log(results);
	})
	.catch((err) => {
		console.log(err);
	});

// User.sync({ alter: true })
// 	.then(() => {
// 		/////////////////////////////
// 		// Working with our updated table.
// 		// const user = User.build({
// 		// 	username: "WittCode",
// 		// 	password: "123",
// 		// 	age: 25,
// 		// 	WittCodeRocks: true,
// 		// });
// 		// user.username = "soccer";
// 		// user.save();
// 		///////////////////////////
// 		// return User.create({
// 		// 	username: "WittCode",
// 		// 	// password: "subscribe",
// 		// 	// age: 25,
// 		// 	// WittCodeRocks: false,
// 		// });
// 		return User.bulkCreate(
// 			[
// 				{
// 					username: "Tomfadgsdfg",
// 					age: 25,
// 					password: "pizzasoccer",
// 				},
// 				{
// 					username: "M",
// 					age: 31,
// 					password: "12345",
// 				},
// 				{
// 					username: "Freddiefasdfads",
// 				},
// 			],
// 			{ validate: true },
// 		);
// 	})
// 	.then((data) => {
// 		// console.log("User added to database!");
// 		// console.log(data.toJSON());
// 		// data.username = "pizza";
// 		// data.age = 45;
// 		// return data.save();
// 		// data.increment({ age: 2, height: 3 });
// 		data.forEach((el) => {
// 			console.log(el.toJSON());
// 		});
// 	})
// 	// .then((data) => {
// 	// 	console.log("User updated!");
// 	// 	console.log(data.toJSON());
// 	// })
// 	.catch((err) => {
// 		console.log(err);
// 	});

// async function syncAndCreateUser() {
// 	try {
// 		// Drop the table if it exists (development environment)
// 		await sequelize.drop();

// 		// Sync the model with the database
// 		await User.sync({ force: true }); // This will drop the table and recreate it

// 		console.log("Database & tables created!");

// 		// Create a new user
// 		const user = await User.create({
// 			username: "WittCode",
// 			password: "subscribe",
// 			age: 25,
// 			WittCodeRocks: false,
// 		});

// 		console.log(user.toJSON());
// 		console.log("User added to database!");
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

// syncAndCreateUser();

// User.drop();
// console.log(sequelize.models.user);

// User.sync({ alter: true })
// 	.then((data) => {
// 		console.log("Table and model syned successfully!");
// 	})
// 	.catch((err) => {
// 		console.log("Error syncing the table and model!");
// 	}); // Add the table to the database.

// async function myFunction() {
// 	await sequelize.authenticate();
// 	console.log("Connection successful!");
// } // Check if the connection is successful by an asynchronous function.

// myFunction();

// sequelize
// 	.authenticate()
// 	.then(() => {
// 		console.log("Connection successful!");
// 	})
// 	.catch((err) => {
// 		console.log("Error connecting to database!");
// 	}); // Check if the connection is successful.

// console.log("Another task.");
