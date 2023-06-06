import jwt from "jsonwebtoken";

const createAccessToken = (payload: any) => {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: process.env.ACCESS_DURATION,
    }
  );
  return accessToken;
};

export { createAccessToken };
