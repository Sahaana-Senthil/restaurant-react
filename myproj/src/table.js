import React, { useState } from "react";
import axios from "axios";
import "./table.css";

function TableReservationPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    date: "",
    purpose: "",
    persons: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to backend
      const response = await axios.post("http://localhost:3004/reservations", formData);
      setMessage(response.data.message); // Display success message
    } catch (error) {
      setMessage("Failed to reserve the table. Please try again.");
      console.error("Error during reservation:", error); // Log error for debugging
    }
  };

  return (
    <div className="reservation-page">
      <h1>Table Reservation</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <p className="error">{errors.date}</p>}
        </div>
        <div className="form-group">
          <label>Purpose:</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Enter the purpose"
          />
          {errors.purpose && <p className="error">{errors.purpose}</p>}
        </div>
        <div className="form-group">
          <label>Approximate Number of Persons:</label>
          <input
            type="number"
            name="persons"
            value={formData.persons}
            onChange={handleChange}
            placeholder="Enter the number of persons"
          />
          {errors.persons && <p className="error">{errors.persons}</p>}
        </div>
        <button type="submit" className="book-table-btn">
          Book Table
        </button>
      </form>
    </div>
  );
}

export default TableReservationPage;
