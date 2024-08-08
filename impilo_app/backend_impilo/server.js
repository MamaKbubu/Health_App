const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const { google } = require("googleapis"); // Added for Google Calendar API
const fs = require("fs"); // Added for file system operations

dotenv.config();

const app = express(); // ensures definition

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

// Google Calendar API Setup
const CREDENTIALS_PATH = path.join(__dirname, "credentials.json"); // Path to your Google OAuth credentials
const TOKEN_PATH = "token.json"; // Path to store OAuth2 tokens

// Load client secrets from a local file
let credentials;
try {
  credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
} catch (error) {
  console.error("Error reading credentials file:", error);
  process.exit(1);
}
const { client_secret, client_id, redirect_uris } = credentials.web || {};

if (!client_secret || !client_id || !redirect_uris) {
  console.error("Error: Credentials missing required fields.");
  process.exit(1);
}

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
// const { client_secret, client_id, redirect_uris } = credentials.installed;
// const oAuth2Client = new google.auth.OAuth2(
//   client_id,
//   client_secret,
//   redirect_uris[0]
// );

// Generate an authentication URL
app.get("/auth", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar.events"],
  });
  res.redirect(authUrl);
});

// Handle the OAuth2 callback
app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  // Save the tokens for future use
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  res.send("Authentication successful! You can close this window.");
});

// Example POST route for appointments
app.post("/appointments", protect, async (req, res) => {
  const { time, date, name, appointmentWith, additionalInfo } = req.body;
  try {
    // Code to handle appointment creation
    res.status(201).json({ message: "Appointment created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create appointment" });
  }
});

// Route to create a new event
app.post("/create-event", protect, async (req, res) => {
  const { startTime, endTime, summary, description } = req.body;

  // Load tokens
  const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH));
  oAuth2Client.setCredentials(tokens);

  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  const event = {
    summary: summary || "Virtual Appointment",
    description: description || "A virtual appointment via Google Meet",
    start: {
      dateTime: startTime,
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: endTime,
      timeZone: "America/Los_Angeles",
    },
    conferenceData: {
      createRequest: {
        requestId: "sample123",
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).send("Error creating event");
  }
});

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
  console.log(`Server is running on port ${PORT}`);
});
