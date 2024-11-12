const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../modules/Gig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
	sentencesPerParagraph: {
		max: 8,
		min: 4,
	},
	wordsPerSentence: {
		max: 16,
		min: 4,
	},
});

// console.log(lorem.generateParagraphs(1));

// Get gig list
// router.get("/", (req, res) =>
// 	Gig.findAll()
// 		.then((gigs) => {
// 			res.render("gigs", {
// 				gigs,
// 			});
// 		})
// 		.catch((err) => console.log(err)),
// );
// router.get("/", (req, res) =>
// 	Gig.findAll()
// 		.then((gigs) => {
// 			console.log("gigs");
// 			res.render("gigs", {
// 				gigs,
// 			});
// 		})
// 		.catch((err) => console.log(err)),
// );

router.get("/", (req, res) =>
	Gig.findAll()
		.then((gigs) => {
			console.log("Fetched gigs:", gigs); // Log the fetched data

			// Check if data is being fetched correctly
			if (!gigs || gigs.length === 0) {
				console.log("No gigs found.");
			}

			res.render("gigs", {
				gigs: gigs.map((gig) => gig.get({ plain: true })), // Convert Sequelize instances to plain objects
			});
		})
		.catch((err) => {
			console.log("Error fetching gigs:", err); // Log any errors
			res.render("gigs", {
				gigs: [],
			});
		}),
);
// Display add gig from
router.get("/add", (req, res) => res.render("add"));

// Add a gig
router.post("/add", (req, res) => {
	// const data = {
	// 	title: "Simple Wordpress website",
	// 	technologies: "wordpress,php,html,css",
	// 	budget: "$1000",
	// 	description: lorem.generateParagraphs(1),
	// 	contact_email: "user2@gmail.com",
	// };

	let { title, technologies, budget, description, contact_email } = req.body;
	let errors = [];

	// Validate Fields
	if (!title) {
		errors.push({ text: "Please add a ttile" });
	}
	if (!technologies) {
		errors.push({ text: "Please add some technologis" });
	}
	if (!description) {
		errors.push({ text: "Please add a description" });
	}
	if (!contact_email) {
		erros.push({ text: "Please add a contact email" });
	}

	if (errors.length > 0) {
		if (errors.length > 0) {
			res.render("add", {
				errors,
				title,
				technologies,
				budget,
				description,
				contact_email,
			});
		}
	} else {
		if (!budget) {
			budget = "Unknown";
		} else {
			budget = `$${budget}`;
		}

		// Make lowercase and remove pace after comma
		technologies = technologies.toLowerCase().replace(/, /g, ",");

		// Insert into table
		Gig.create({
			title,
			technologies,
			description,
			budget,
			contact_email,
		})
			.then((gig) => res.redirect("/gigs"))
			.catch((err) => console.log(err));
	}
});

// Srearch for gigs
// router.get("/search", (req, res) => {
// 	const { term } = req.query;

// 	Gig.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
// 		.then((gigs) => res.render("gigs", { gigs }))
// 		.catch((err) => console.log(err));
// });
// Search for gigs
router.get("/search", (req, res) => {
	const { term } = req.query;

	Gig.findAll({
		where: {
			technologies: {
				[Op.like]: "%" + term + "%",
			},
		},
	})
		.then((gigs) => {
			// Convert Sequelize instances to plain JavaScript objects
			const plainGigs = gigs.map((gig) => gig.get({ plain: true }));
			res.render("gigs", { gigs: plainGigs });
		})
		.catch((err) => console.log(err));
});

module.exports = router;
