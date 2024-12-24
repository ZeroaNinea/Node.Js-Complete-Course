const pool = require("../config/db");
const { encrypt } = require("../cryptography/encrypt-decrypt");

const isSessionExpired = (exp) => {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds.
  return currentTime > exp;
};

// Example middleware to check session expiration.
const checkSessionExpiration = async (req, res, next) => {
  try {
    const email = encrypt(req.oidc.user.email);
    const [result] = await pool.query("SELECT exp FROM users WHERE email = ?", [
      email,
    ]);

    if (result.length === 0) {
      throw new Error("User not found");
    }

    const { exp } = result[0];
    if (isSessionExpired(exp)) {
      return res
        .status(401)
        .json({ error: "Session expired, please log in again" });
    }

    next();
  } catch (err) {
    console.error("Error checking session expiration:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Refresh expired token.
const refreshExpiration = async (email, newExp) => {
  try {
    const result = await pool.query(
      "UPDATE users SET exp = FROM_UNIXTIME(?) WHERE email = ?",
      [newExp, email]
    );

    if (result.affectedRows === 0) {
      console.warn(`No rows updated. Email not found: ${email}`);
    } else {
      console.log("Session expiration refreshed successfully.");
    }
  } catch (error) {
    console.error("Error refreshing expiration:", error.message);
    throw new Error("Failed to refresh session expiration");
  }
};

module.exports = { checkSessionExpiration, refreshExpiration };
