//imports
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "heytherehowyoudoing";

//
//Route 1: Create a user using: POST "api/auth/createUser" doesn't require authentication, no login required
router.post(
  "/createUser",
  [
    //validators
    body("name", "Enter your name").isLength({ min: 3 }),
    body("email", "Enter your email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false

    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    //check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "A user with this email already exists" });
      }

      //create a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
      });

      //create the data to be send
      const data = {
        user: {
          id: user.id,
        },
      };

      //creat the authentication token
      const authToken = jwt.sign(data, JWT_SECRET);



      success = true;
      res.json({ success, authToken });
      // .then((user) => res.json(user))
      // .catch((err) => {
      //   console.log(err);
      //   res.json({
      //     error: "Please enter a unique value",
      //     message: err.message,
      //   });
      // });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error");
    }
  }
);

//Route 2: authenticate a user using: POST "api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false

    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //destructuring the response body
    const { email, password } = req.body;
    try {
      //search for the user
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }

      // internaly it will compare the hash of the password entered adn the password stored and return a boolean value(T/F)
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }

      //send the user id, if user is found
      const data = {
        user: {
          id: user._id,
        },
      };
      success = true
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Interval Server error ");
    }
  }
);

// Route 3: Get loggedin user details using: POST "api/auth/getUser", Login required
// using fetchUser as middleware here
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    //taking the user id and finding the user by the userid and sending the user details as response
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
