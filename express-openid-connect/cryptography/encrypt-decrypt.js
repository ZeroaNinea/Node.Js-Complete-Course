const crypto = require("crypto");
const fs = require("fs");

const key = fs.readFileSync("./keys/encryption.key", "utf-8");
const iv = fs.readFileSync("./keys/init_vector.key", "utf-8");

const encrypt = (text) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { encrypt, decrypt };
