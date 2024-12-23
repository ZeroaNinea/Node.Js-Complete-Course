const requireClaim = (claim, value) => {
  return (req, res, next) => {
    // Check if user is authenticated and has the required claim.
    if (req.oidc && req.oidc.user && req.oidc.user[claim] === value) {
      next();
    } else {
      res.redirect("/access-denied"); // Redirect to a safe page.
    }
  };
};

module.exports = { requireClaim };
