// Create a `./keys` folder in the root of the project and run this script separately with the `npm run gkeys` command.

const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

// Function to generate random bytes and save to a file.
const generateKeyFile = (filename, size) => {
  const key = crypto.randomBytes(size);
  const filePath = path.join(__dirname, "../keys/", filename);
  fs.writeFileSync(filePath, key.toString("hex"));
  console.log(`Generated ${filename} in the keys folder.`);
};

// Generate the encryption key (32 bytes for AES-256).
generateKeyFile("encryption.key", 32);

// Generate the initialization vector (16 bytes).
generateKeyFile("init_vector.key", 16);

console.log("Key generation complete!");
