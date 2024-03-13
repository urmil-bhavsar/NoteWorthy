const jwt = require("jsonwebtoken");
const JWT_SECRET = "heytherehowyoudoing";

//creating a fetchuser function which will take the jwttoken of the user
//next() is called to pass the control to the next middleware function
const fetchUser = (req, res, next) => {
  //get the user form the jwt token and add it to req object
  const token = req.header("auth-token");
  console.log("json middle: token::", token)
  if (!token) {
    res.status(401).send({ error: "Plase authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Plase authenticate using a valid token" });
  }
};

module.exports = fetchUser;
