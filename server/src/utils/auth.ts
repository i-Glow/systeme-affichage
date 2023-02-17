const jwt = require("jsonwebtoken");

const createAccessToken = (payload: any) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_DURATION,
  });
  return accessToken;
};

export { createAccessToken };
