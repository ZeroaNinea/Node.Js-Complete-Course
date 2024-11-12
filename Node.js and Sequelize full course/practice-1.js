const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize("sequelize_video_db", "root", "", {
	host: "localhost",
	port: 3306,
	dialect: "mysql",
	logging: false,
});

const Student = sequelize.define(
	"student",
	{
		student_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4, 20],
			},
		},
		favorite_class: {
			type: DataTypes.STRING(25),
			defaultValue: "Computer Science",
		},
		school_year: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		subscribe_to_wittcode: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	},
);

Student.sync()
	.then(() => {
		console.log("Model synced successfully!");
		return Student.findAll({
			attributes: [
				"school_year",
				[
					sequelize.fn("COUNT", sequelize.col("school_year")),
					"num_students",
				],
			],
			group: "school_year",
			// where: {
			// 	[Op.or]: {
			// 		favorite_class: "Computer Science",
			// 		subscribe_to_wittcode: true,
			// 	},
			// },
		});
	})
	.then((data) => {
		data.forEach((el) => {
			console.log(el.toJSON());
		});
	})
	.catch((err) => {
		console.log(err);
	});
