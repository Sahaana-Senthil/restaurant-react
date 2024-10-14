const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3004;

// Middleware
app.use(cors()); // Allows requests from the frontend
app.use(bodyParser.json()); // Parses incoming requests as JSON

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/restaurantDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
    process.exit(1); // Exits if the connection fails
  });

// Reservation Schema
const reservationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  purpose: { type: String, required: true },
  persons: { type: Number, required: true },
});

// Reservation model
const Reservation = mongoose.model("Reservation", reservationSchema);

// Route to handle table reservation
app.post("/reservations", async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save(); // Save data to MongoDB
    res.status(201).json({ message: "Reservation saved successfully" });
  } catch (error) {
    console.error("Error saving reservation:", error); // Logs error to console
    res.status(500).json({ message: "Failed to save reservation", error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});