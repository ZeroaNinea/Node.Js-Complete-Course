const pool = require("../config/db");

const formatDateForMySQL = (isoString) => {
  // Converts the ISO 8601 string into MySQL DATETIME format by stripping milliseconds and replacing the `T` with a space.
  const date = new Date(isoString);
  return date.toISOString().slice(0, 19).replace("T", " ");
};

// Add user to the database.
const addUserToDatabase = async (payload) => {
  const {
    email,
    name,
    nickname,
    given_name,
    picture,
    updated_at,
    email_verified,
    sub,
    sid,
    nonce,
    iss,
    aud,
    iat,
    exp,
  } = payload;

  const formattedUpdatedAt = formatDateForMySQL(updated_at);

  // const tokenExpiration = Date.now() + exp * 1000;

  const addUserQuery = `
    INSERT INTO users (
      sub, email, email_verified, name, nickname, given_name, picture, updated_at, sid, nonce, iss, aud, iat, exp
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FROM_UNIXTIME(?), FROM_UNIXTIME(?))
    ON DUPLICATE KEY UPDATE
      email = VALUES(email),
      email_verified = VALUES(email_verified),
      name = VALUES(name),
      nickname = VALUES(nickname),
      given_name = VALUES(given_name),
      picture = VALUES(picture),
      updated_at = VALUES(updated_at),
      sid = VALUES(sid),
      nonce = VALUES(nonce),
      iss = VALUES(iss),
      aud = VALUES(aud),
      iat = VALUES(iat),
      exp = VALUES(exp);
  `;

  try {
    await pool.query(addUserQuery, [
      sub,
      email,
      email_verified,
      name,
      nickname,
      given_name,
      picture,
      formattedUpdatedAt,
      sid,
      nonce,
      iss,
      aud,
      iat,
      exp,
    ]);
    console.log("User added or updated in the database.");
  } catch (error) {
    console.error("Error saving user to database:", error);
    throw new Error("Database error");
  }
};

module.exports = { addUserToDatabase };
