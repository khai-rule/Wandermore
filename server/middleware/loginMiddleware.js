const checkLogin = (req, res, next) => {
  if (!req.session.authenticated) {
    res.status(401).json({ msg: "Unauthorized" });
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = checkLogin;
