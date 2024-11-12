const fs = require('fs');
const Tours = require('./../models/tourModel.js');
const { Op } = require('sequelize');

// const tours = JSON.parse(
// 	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

exports.checkID = (req, res, next, val) => {
	console.log(`Tour id is: ${val}`);

	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}
	next();
};

// exports.checkBody = (req, res, next) => {
// 	if (!req.body.name || !req.body.price) {
// 		return res.status(400).json({
// 			status: 'fail',
// 			message: 'Missing name or price',
// 		});
// 	}
// 	next();
// };

exports.getAllTours = async (req, res) => {
	try {
		// BUILD QUERY
		// 1A) Filtering
		let queryObj = { ...req.query };
		const excludedFields = ['page', 'sort', 'limit', 'fields'];

		excludedFields.forEach((el) => delete queryObj[el]);

		// console.log(req.requestTime);
		const allTours = await Tours.getAllTours();
		const filteredTours = await Tours.getByAttribute(queryObj);
		const limitedTours = await Tours.getLimited(req.query);

		// 2B) Advanced filtering
		// console.log(queryObj);
		// let queryStr = JSON.stringify(queryObj);
		// console.log(queryStr);
		// queryStr = queryStr.replace(
		// 	/\b(gte|gt|lte|lt)\b/g,
		// 	(match) => `[Op.${match}]`,
		// );

		queryArr = ['gte', 'gt', 'lte', 'lt'];

		for (const key in queryObj) {
			queryArr.forEach((prop) => {
				queryObj[key][prop]
					? (queryObj[key] = { [Op[prop]]: queryObj[key][prop] })
					: console.log('Something is wrong with query properties!');
			});
		}

		// console.log(req.query.sort);
		// queryObj = queryObj.sort(req.query.sort);

		// Sorting
		let tours;
		if (Object.keys(queryObj).length === 0) {
			console.log('getAllTours');
			tours = allTours;
		} else if (req.query.page) {
			tours = limitedTours;
		} else {
			console.log('getByAttribute');
			tours = filteredTours;
		}
		// const tours = await Tours.getAllTours();

		if (req.query.sort) {
			const sortBy = req.query.sort.split(',').join(' ');
			tours.sort((a, b) => {
				if (typeof a[req.query.sort] === 'string') {
					b[sortBy] - a[sortBy];
				} else {
					a[sortBy] - b[sortBy];
				}
			});
		} else {
			tours.sort((a, b) => a.createdAt - b.createdAt);
		}

		// 3) Field limiting
		let toursLimit = [];
		if (req.query.fields) {
			const fields = req.query.fields.split(',');
			tours.forEach((tour, id) => {
				toursLimit[id] = {};
				fields.forEach((field) => {
					if (tour[field]) {
						toursLimit[id][field] = tour[field];
					}
				});
			});
			tours = toursLimit;
		}

		// 4) Pagination
		// if (req.query.page) {
		// 	tours = limitedTours;
		// }

		res.status(200).json({
			status: 'success',
			// requestedAt: req.requestTime,
			results: tours.length,
			data: {
				tours,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.getTour = async (req, res) => {
	// const test = await Tours.getTour(req.params.id);
	try {
		const tour = await Tours.getTour(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				tour,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
	// console.log(req.params);
	// const id = req.params.id * 1;
	// const tour = tours.find((el) => el.id === id);
	// if (id > tours.length - 1) {
	// if (!tour) {
	// 	return res.status(404).json({
	// 		status: 'fail',
	// 		message: 'Invalid ID',
	// 	});
	// }
	// res.status(200).json({
	// 	status: 'success',
	// 	data: {
	// 		tour,
	// 	},
	// });
};

exports.createTour = (req, res) => {
	// console.log(req);
	// console.log(req.requestTime);

	// const newId = tours[tours.length - 1].id + 1;
	// const newTour = Object.assign({ id: newId }, req.body);

	// tours.push(newTour);

	// fs.writeFile(
	// 	`${__dirname}/dev-data/data/tours-simple.json`,
	// 	JSON.stringify(tours),
	// 	(err) => {
	// 		res.status(201).json({
	// 			status: 'success',
	// 			data: {
	// 				tour: newTour,
	// 			},
	// 		});
	// 	},
	// );
	try {
		Tours.createEntry(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				tour: createTable(),
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.updateTour = async (req, res) => {
	// if (req.params.id * 1 > tours.length) {
	// 	return res.status(404).json({
	// 		status: 'fail',
	// 		message: 'Invalid ID',
	// 	});
	// }
	try {
		const tour = await Tours.updateTour(req.params.id, req.body);

		res.status(200).json({
			status: 'success',
			data: {
				tour,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.deleteTour = async (req, res) => {
	// if (req.params.id * 1 > tours.length) {
	// 	return res.status(404).json({
	// 		status: 'fail',
	// 		message: 'Invalid ID',
	// 	});
	// }
	// res.status(204).json({
	// 	status: 'success',
	// 	data: null,
	// });
	try {
		await Tours.deleteTour(req.params.id);

		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};
