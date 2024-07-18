// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://maboelatk:admin@impilo.nty81ym.mongodb.net/HCW",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// Define Nurse Schema and Model
const nurseSchema = new mongoose.Schema({
  name: String,
  phone: String,
  specialty: String,
  location: String,
});
// Define Doctor Schema and Model
const doctorSchema = new mongoose.Schema({
  name: String,
  phone: String,
  specialty: String,
  location: String,
});

const Nurse = mongoose.model("Nurse", nurseSchema);
const Doctor = mongoose.model("Doctor", doctorSchema);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Sample route to get doctors data
app.get("/Doctors", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});
app.get("/Nurses", async (req, res) => {
  const nurses = await Nurse.find();
  res.json(nurses);
});
app.get("/", (req, res) => {
  res.send("Welcome to Impilo TALK");
});
//this is the route to add a doctor onto the database
app.post("/adddoctor", async (req, res) => {
  const { name, phone, specialty, location } = req.body;
  const doctor = new Doctor({ name, phone, specialty, location });
  await doctor.save();
  res.json(doctor);
});
app.post("/addnurse", async (req, res) => {
  const { name, phone, specialty, location } = req.body;
  const nurse = new Nurse({ name, phone, specialty, location });
  await nurse.save();
  res.json(nurse);
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${5000}`);
});
