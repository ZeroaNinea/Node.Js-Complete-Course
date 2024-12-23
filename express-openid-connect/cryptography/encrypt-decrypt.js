const crypto = require("crypto");
const fs = require("fs");

// Read the key and IV as Buffers
const key = Buffer.from(
  fs.readFileSync("./keys/encryption.key", "utf-8"),
  "hex"
);
const iv = Buffer.from(
  fs.readFileSync("./keys/init_vector.key", "utf-8"),
  "hex"
);

const encrypt = (text) => {
  if (typeof text === "string") {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
  } else {
    console.log(`
      I'm so sorry, girl. Only strings can be encrypted.
      :p
    `);
  }
};

const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

module.exports = { encrypt, decrypt };
