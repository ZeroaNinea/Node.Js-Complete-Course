const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize("sequelize_video_db", "root", "", {
	dialect: "mysql",
});

const Country = sequelize.define(
	"country",
	{
		countryName: {
			type: DataTypes.STRING,
			unique: true,
		},
	},
	{
		timestamps: false,
	},
);

const Capital = sequelize.define(
	"capital",
	{
		capitalName: {
			type: DataTypes.STRING,
			unique: true,
		},
	},
	{
		timestamps: false,
	},
);

Country.hasOne(Capital, { onUpdate: "CASCADE" });
Capital.belongsTo(Country, { onDelete: "CASCADE" });

let country, capital;

sequelize
	.sync({ alter: true })
	.then(() => {
		// working with our updated table.
		// Country.bulkCreate([
		// 	{
		// 		countryName: "Spain",
		// 	},
		// 	{
		// 		countryName: "France",
		// 	},
		// 	{
		// 		countryName: "Germany",
		// 	},
		// 	{
		// 		countryName: "England",
		// 	},
		// ]);
		// Capital.bulkCreate([
		// 	{
		// 		capitalName: "London",
		// 	},
		// 	{
		// 		capitalName: "Madrid",
		// 	},
		// 	{
		// 		capitalName: "Paris",
		// 	},
		// 	{
		// 		capitalName: "Berlin",
		// 	},
		// ]);
		return Country.findOne({ where: { countryName: "France" } });
	})
	.then((data) => {
		country = data;
		return Capital.findOne({ where: { capitalName: "Paris" } });
	})
	.then((data) => {
		capital = data;
		return capital.setCountry(country);
	})
	.then((data) => {
		console.log(data);
	})
	.catch((err) => {
		console.log(err);
	});
