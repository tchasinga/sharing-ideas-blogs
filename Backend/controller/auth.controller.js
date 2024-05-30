const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Adding a singup for user to the app...
// const signup = async (req, res, next) =>{
//     try {
//         const {username, email, password} = req.body;
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword,
//         })
//         const result = await newUser.save();
//         res.status(201).json({
//             success: true,
//             message: "User created successfully",
//             data: result,
//         })
//     } catch (error) {
//         next(error);
//         res.status(400).json({
//             success: false,
//             message: "Failed to create a user in your system",
//             data: result,
//         })
//     }
// }

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service you prefer
  auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
  },
});

// Adding a signup for user to the app...
const signup = async (req, res, next) => {
  try {
      const { username, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
          username,
          email,
          password: hashedPassword,
      });
      const result = await newUser.save();

      // Send a welcome email
      const mailOptions = {
          from: process.env.EMAIL_USER, // Sender address
          to: email, // List of recipients
          subject: 'Welcome to Our App!', // Subject line
          text: `Hello ${username},\n\nWelcome to our application! We're excited to have you on board.\n\nBest Regards,\nThe Team`, // Plain text body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error('Error sending welcome email:', error);
          } else {
              console.log('Welcome email sent:', info.response);
          }
      });

      res.status(201).json({
          success: true,
          message: "User created successfully",
          data: result,
      });
  } catch (error) {
      next(error);
      res.status(400).json({
          success: false,
          message: "Failed to create a user in your system",
      });
  }
};


// Adding a signin  for user to the web application...

const signin = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const validUser = await User.findOne({ email });
  
      if (!validUser) {
        const error = new Error("User not found");
        error.status = 404;
        return next(error);
      }
  
      const validPassword = await bcrypt.compare(password, validUser.password);
  
      if (!validPassword) {
        const error = new Error("Password is not correct");
        error.status = 401;
        return next(error);
      }
      // if all is good, user signed in successfully
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      const { password: pass, ...userDetails } = validUser._doc;
  
      res.cookie('access_token', token, { httpOnly: true, sameSite: true, secure: true }).status(200).json({
        token,
        user: userDetails,
        success: true,
        message: "User signed in successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  
  // Adding a singout for user to the web application...
  const singout = (req, res, next) => {
   try {
    res.clearCookie('access_token').json({
      message: "Signout successfully"
    });
   } catch (error) {
    next(error);
   }
  };

module.exports = {signup, signin , singout}