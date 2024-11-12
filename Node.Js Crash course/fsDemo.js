// import fs from "fs";
import fs from "fs/promises";

// readFile() - callback
// fs.readFile("./test.txt", "utf-8", (err, data) => {
// 	if (err) throw err;
// 	console.log(data);
// });

// readFileSync() - Synchronous version
// const data = fs.readFileSync("./test.txt", "utf-8");
// console.log(data);

// fs.readFile("./test.txt", "utf8")
// 	.then((data) => console.log(data))
// 	.catch((err) => console.log(err));

// 	readFile() - async/await

const readFile = async () => {
	try {
		const data = await fs.readFile("./test.txt", "utf8");
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};

// writeFile()
const writeFile = async () => {
	try {
		await fs.writeFile("./test.txt", "Hello, I am writing to this file.");
		console.log("File written to...");
	} catch (err) {
		console.log(err);
	}
};

// appendFile()
const appendFile = async () => {
	try {
		await fs.appendFile("./test.txt", "\nThis is appended text.");
		console.log("File appended to...");
	} catch (err) {
		console.log(err);
	}
};

readFile();
writeFile();
appendFile();
readFile();
