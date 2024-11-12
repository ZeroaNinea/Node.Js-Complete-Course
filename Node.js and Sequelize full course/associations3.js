const { HasOne } = require("sequelize");
const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize("sequelize_video_db", "root", "", {
	dialect: "mysql",
});

const Customer = sequelize.define(
	"customer",
	{
		customerName: {
			type: DataTypes.STRING,
		},
	},
	{
		timestamps: false,
	},
);

const Product = sequelize.define(
	"product",
	{
		productName: {
			type: DataTypes.STRING,
		},
	},
	{
		timestamps: false,
	},
);

const CustomerProduct = sequelize.define("customerproduct", {
	customerproductId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
});

Customer.belongsToMany(Product, {
	through: CustomerProduct,
});
Product.belongsToMany(Customer, {
	through: CustomerProduct,
});

let customer, product;
sequelize
	.sync({ alter: true })
	.then(() => {
		return Customer.destroy({ where: { customerName: "WittCode" } });
	})
	.then((data) => {
		console.log(data);
	})
	.catch((err) => {
		console.log(err);
	});
