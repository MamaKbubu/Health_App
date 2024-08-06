const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to the JSON file
const testimonialsFilePath = path.join(__dirname, "testimonials.json");

// Load testimonials from JSON file
const loadTestimonials = () => {
  try {
    const data = fs.readFileSync(testimonialsFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading testimonials file:", error);
    return [];
  }
};

// Save testimonials to JSON file
const saveTestimonials = (testimonials) => {
  try {
    const data = JSON.stringify(testimonials, null, 2);
    fs.writeFileSync(testimonialsFilePath, data, "utf8");
  } catch (error) {
    console.error("Error writing testimonials file:", error);
  }
};

// Serve static files (for serving images and front-end assets)
app.use(express.static(path.join(__dirname, "public")));

// Get all testimonials
app.get("/testimonials", (req, res) => {
  const testimonials = loadTestimonials();
  res.json(testimonials);
});

// Add a new testimonial
app.post("/testimonials", (req, res) => {
  const testimonials = loadTestimonials();
  const newTestimonial = req.body;

  if (
    !newTestimonial.name ||
    !newTestimonial.message ||
    !newTestimonial.image
  ) {
    return res
      .status(400)
      .json({ error: "Name, message, and image are required" });
  }

  testimonials.push(newTestimonial);
  saveTestimonials(testimonials);
  res.status(201).json(newTestimonial);
});

// Serve the front-end application (if using React or similar framework)
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${5000}`);
});
