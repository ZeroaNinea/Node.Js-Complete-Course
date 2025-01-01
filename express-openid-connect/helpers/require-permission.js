const jwt = require("jsonwebtoken");

const requirePermission = (permission, redirectPath = "/access-denied") => {
  return (req, res, next) => {
    const token = req.oidc.accessToken?.access_token;

    if (!token) {
      return res.redirect(redirectPath);
    }

    const decoded = jwt.decode(token);

    // console.log(decoded);

    const permissions = decoded.permissions || decoded.scope?.split(" ") || [];

    if (permissions.includes(permission)) {
      return next();
    }

    res.redirect(redirectPath);
  };
};

module.exports = { requirePermission };
