const Sequelize = require('sequelize');

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
		console.log('Error connecting to database!');
	});

const Tours = sequelize.define(
	'tours',
	{
		name: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: { msg: 'A tour must have a name!' },
			},
			unique: true,
		},
		duration: {
			type: Sequelize.DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: { msg: 'A tour must have a duration!' },
			},
		},
		maxGroupSize: {
			type: Sequelize.DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: { msg: 'A tour must have a group size!' },
			},
		},
		difficulty: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: { msg: 'A tour must have a difficulty!' },
			},
		},
		ratingsAverage: {
			type: Sequelize.DataTypes.FLOAT,
			default: 4.5,
		},
		ratingsQuantity: {
			type: Sequelize.DataTypes.INTEGER,
			default: 0,
		},
		price: {
			type: Sequelize.DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: { msg: 'A tour must have a price!' },
			},
		},
		priceDiscount: Sequelize.DataTypes.INTEGER,
		summary: {
			type: Sequelize.DataTypes.STRING,
		},
		description: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: { msg: 'A tour must have a description!' },
			},
		},
		imageCover: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: { msg: 'A tour must have a cover image!' },
			},
		},
		images: {
			type: Sequelize.DataTypes.JSON,
			default: [],
		},
		createdAt: {
			type: Sequelize.DataTypes.DATE,
			default: Date.now(),
		},
		startDates: {
			type: Sequelize.DataTypes.JSON,
			default: [],
		},
	},
	{
		hooks: {
			beforeValidate: (tour) => {
				if (tour.id) {
					tour.summary = tour.summary.trim();
					tour.description = tour.description.trim();
				}
			},
		},
	},
);

Tours.sync()
	.then((data) => {
		console.log('Table and model syned successfully!');
	})
	.catch((err) => {
		console.log('Error syncing the table and model!');
	});

const createEntry = function (newTour) {
	Tours.sync({ alter: true })
		.then(() => {
			const tour = Tours.build(newTour);
			// const tour = Tours.build(req);
			return tour.save();
		})
		.then((data) => {
			console.log('Tour added to database!');
		})
		.catch((err) => {
			console.log(err);
		});

	const Tour = Tours.build({});

	// console.log(Tour);
	return Tour;
};

const getAllTours = function () {
	return Tours.sync({ after: true }).then(() => {
		return Tours.findAll();
	});
	// .then((data) => {
	// 	data.forEach((element) => {
	// 		console.log(element.toJSON());
	// 	});
	// })
	// .catch((err) => {
	// 	console.log(err);
	// });
};

const getByAttribute = function (filterObj) {
	console.log('Hello from `getByAttribute`!');
	return Tours.sync({ alter: true }).then(() => {
		return Tours.findAll({ where: filterObj });
	});
};

const getLimited = function (query) {
	const page = Number(query.page);
	const limit = Number(query.limit);

	return Tours.sync({ alter: true }).then(() => {
		return Tours.findAndCountAll({
			limit: limit,
			offset: page * limit,
		});
	});
};
// const getLimited = async function (query) {
// 	try {
// 		const page = Number(query.page);
// 		const limit = Number(query.limit);
// 		await Tours.sync({ alter: true });
// 		const { count, rows } = await Tours.findAndCountAll({
// 			limit: limit,
// 			offset: page * limit,
// 		});

// 		const totalPages = Math.ceil(count / limit);

// 		if (page >= totalPages) {
// 			const error = new Error('This page does not exist!');
// 			error.status = 404;
// 			throw error;
// 		}

// 		return { count, rows, totalPages, currentPage: page };
// 	} catch (error) {
// 		if (!error.status) {
// 			error.status = 500;
// 		}
// 		throw error;
// 	}
// };

const getTour = function (tourId) {
	return Tours.sync({ alter: true }).then(() => {
		return Tours.findOne({ where: { id: tourId } });
	});
};

const updateTour = function (tourId, updateData) {
	return Tours.update(updateData, { where: { id: tourId } });
};

const deleteTour = function (tourId) {
	return Tours.destroy({ where: { id: tourId } });
};

// console.log(Tour, 'This is Tour-----------------');

// const newTour = new Tour({});
// newTour.save();

module.exports = {
	createEntry,
	getAllTours,
	getByAttribute,
	getLimited,
	getTour,
	updateTour,
	deleteTour,
};
