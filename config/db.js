
const mongoose = require('mongoose');
const dbURI = "mongodb+srv://cwpalade97:chetan1811@cluster0.ltuea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));



  // require('dotenv').config();
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(dbURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB Connected');
//   } catch (err) {
//     console.error('Database connection failed:', err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;