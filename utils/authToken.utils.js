const jwt = require("jsonwebtoken");

const generateToken = (user, role) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.fullname, role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = { generateToken };
