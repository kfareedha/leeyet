const jwt = require("jsonwebtoken");

exports.createAccessToken = (id) => {
  return jwt.sign(
    {
      userInfo: {
        id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
};
