const isSessionExpired = (exp) => {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds.
  return currentTime > exp;
};

// Example middleware to check session expiration.
const checkSessionExpiration = async (req, res, next) => {
  try {
    const email = req.user.email; // Assume `req.user` contains the user info.
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

    next(); // Proceed if the session is valid.
  } catch (error) {
    console.error("Error checking session expiration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Refresh expired token.
const refreshExpiration = async (email, newExp) => {
  try {
    await pool.query(
      "UPDATE users SET exp = FROM_UNIXTIME(?) WHERE email = ?",
      [newExp, email]
    );
    console.log("Session expiration refreshed.");
  } catch (error) {
    console.error("Error refreshing expiration:", error);
    throw new Error("Database error");
  }
};

module.exports = { checkSessionExpiration, refreshExpiration };
