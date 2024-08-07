const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
// Remove the duplicate declaration of 'PORT'

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://maboelatk:admin@impilo.nty81ym.mongodb.net/HCW",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const professionalSchema = new mongoose.Schema({
  name: String,
  phone: String,
  specialty: String,
  location: String,
  type: String,
});

const Professional = mongoose.model("Professional", professionalSchema);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

// Error Handling Middleware
const handleError = (err, res) => {
  console.error(err.message);
  res.status(500).json({ message: "Server error" });
};

// Generate JSON Web Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register Route
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ email, password });
    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (error) {
    handleError(error, res);
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({ _id: user._id, email: user.email, token });
  } catch (error) {
    handleError(error, res);
  }
});

// Authentication Middleware
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Professionals Routes
app.get("/professionals/:type", protect, async (req, res) => {
  try {
    const professionals = await Professional.find({ type: req.params.type });
    res.json(professionals);
  } catch (error) {
    handleError(error, res);
  }
});

app.post("/professionals", protect, async (req, res) => {
  const { name, phone, specialty, location, type } = req.body;
  try {
    const professional = new Professional({
      name,
      phone,
      specialty,
      location,
      type,
    });
    await professional.save();
    res.json(professional);
  } catch (error) {
    handleError(error, res);
  }
});

// Basic Route
app.get("/", (req, res) => {
  res.send("Welcome to Impilo TALK");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${5000}`);
});
