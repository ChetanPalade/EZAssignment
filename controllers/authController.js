const User = require('../models/user'); // User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Signup Controller
exports.signUp = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate input
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const verificationCode = crypto.randomBytes(20).toString('hex');
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      email_verified: false,
      verification_code: verificationCode,
    });

    await newUser.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'paladeche19@gmail.com', // Replace with your email
        pass: 'C2', // Replace with your email password
      },
    });

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Please verify your email by clicking the following link:</p>
             <a href="http://localhost:3000/auth/verify-email/${verificationCode}">Verify Email</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'User registered successfully! Please check your email for verification.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password.' });
  }

  // Check if the password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password.' });
  }

  // Check if email is verified
  if (!user.email_verified) {
    return res.status(400).json({ message: 'Please verify your email to log in.' });
  }

  // Generate JWT
  const token = jwt.sign({ id: user._id, role: user.role }, 'jwt_secret_key', { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful.', token });
};

// Email Verification Controller
exports.verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;

  try {
    const user = await User.findOne({ verification_code: verificationCode });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification code.' });
    }

    user.email_verified = true;
    user.verification_code = null;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};



// const User = require('../models/user');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');

// exports.signUp = async (req, res) => {
//   try {
//     const { username, email, password, role } = req.body;

//     // Validate input
//     if (!username || !email || !password || !role) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Check for existing user
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     // Save user to the database
//     const newUser = new User({ username, email, password, role });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Login
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).send('Invalid email or password');
//   }

//   if (!user.email_verified) return res.status(403).send('Email not verified');

//   const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
//   res.send({ token });
// };

// // Verify Email
// exports.verifyEmail = async (req, res) => {
//   const { verification_code } = req.params;

//   try {
//     const decoded = jwt.verify(verification_code, process.env.JWT_SECRET);
//     const user = await User.findOneAndUpdate({ email: decoded.email }, { email_verified: true });
//     res.send({ message: 'Email verified successfully' });
//   } catch (err) {
//     res.status(400).send('Invalid or expired token');
//   }
// };
