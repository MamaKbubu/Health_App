// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
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

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.get("/professionals/:type", async (req, res) => {
  const type = req.params.type;
  const professionals = await Professional.find({ type });
  res.json(professionals);
});

app.post("/professionals", async (req, res) => {
  const { name, phone, specialty, location, type } = req.body;
  const professional = new Professional({
    name,
    phone,
    specialty,
    location,
    type,
  });
  await professional.save();
  res.json(professional);
});

app.get("/", (req, res) => {
  res.send("Welcome to Impilo TALK");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${5000}`);
});
