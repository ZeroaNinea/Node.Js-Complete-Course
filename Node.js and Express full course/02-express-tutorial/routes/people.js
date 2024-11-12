const express = require("express");
const router = express.Router();

const {
	getPeople,
	createPerson,
	createPersonPostman,
	updatePerson,
	deletePerson,
} = require("../controllers/people");

// router.get("/", getPeople);
// router.post("/", createPerson);
// router.post("/postman", createPersonPostman);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);

router.route("/").get(getPeople).post(createPerson);
router.route("/postman").post(createPersonPostman);
router.route("/:id").put(updatePerson).delete(deletePerson);

// let { people } = require("../data");

// router.post("/login", (req, res) => {
// 	const { name } = req.body;
// 	if (name) {
// 		return res.status(200).send(`Welcome ${name}`);
// 	}

// 	res.status(401).send("Please Provide Credentials");
// });

// router.get("/", (req, res) => {
// 	res.status(200).json({ success: true, data: people });
// });

// router.post("/", (req, res) => {
// 	const { name } = req.body;
// 	if (!name) {
// 		return res
// 			.status(400)
// 			.json({ success: false, msg: "please provide name value" });
// 	}
// 	res.status(201).send({ success: true, person: name });
// });

// router.post("/postman", (req, res) => {
// 	const { name } = req.body;
// 	if (!name) {
// 		return res
// 			.status(400)
// 			.json({ success: false, msg: "please provide name value" });
// 	}
// 	res.status(201).send({ success: true, data: [...people, name] });
// });

// router.put("/:id", (req, res) => {
// 	const { id } = req.params;
// 	const { name } = req.body;

// 	const person = people.find((person) => person.id === Number(id));

// 	if (!person) {
// 		return res
// 			.status(404)
// 			.json({ success: false, msg: `no person with id ${id}` });
// 	}
// 	const newPeople = people.map((person) => {
// 		if (person.id === Number(id)) {
// 			person.name = name;
// 		}
// 		return person;
// 	});
// 	res.status(200).json({ success: true, data: newPeople });
// });

// router.delete("/:id", (req, res) => {
// 	const person = people.find((person) => person.id === Number(req.params.id));

// 	if (!person) {
// 		return res.status(404).json({
// 			success: false,
// 			msg: `no person with id ${req.params.id}`,
// 		});
// 	}
// 	const newPeople = people.filter(
// 		(person) => person.id !== Number(req.params.id),
// 	);
// 	return res.status(200).json({ success: true, data: newPeople });
// });

module.exports = router;
