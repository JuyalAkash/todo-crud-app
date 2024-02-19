import jwt from "jsonwebtoken";

const { AUTH_ACCESS_TOKEN_SECRET } = process.env;

// VERIFYING JWT TOKEN FOR PROVIDE AUTHENTICATION TO USER
const isAuth = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .send({ message: "Not authorized to access this route" });
  }
  token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, AUTH_ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).send({ message: "Invalid Token" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Not authorized to access this route" });
  }
};

export default isAuth;
