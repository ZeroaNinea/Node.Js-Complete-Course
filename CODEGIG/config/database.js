const Sequelize = require("sequelize");

module.exports = new Sequelize("codegig_db", "root", "", {
	host: "localhost",
	dialect: "mysql",
	operatorsAliases: false,

	poll: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});
