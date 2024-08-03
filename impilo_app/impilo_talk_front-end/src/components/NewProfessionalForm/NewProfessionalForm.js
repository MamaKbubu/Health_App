import React, { useState } from "react";
import { FormContainer, Form, Input, Select, Button } from "./Professions";
import axios from "axios";

const NewProfessionalForm = ({ fetchProfessionals }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    specialty: "",
    location: "",
    type: "doctor", // default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/professionals", formData);
      fetchProfessionals(); // Refresh the professional list
      setFormData({
        name: "",
        phone: "",
        specialty: "",
        location: "",
        type: "doctor",
      });
    } catch (error) {
      console.error("Error adding professional:", error);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="specialty"
          placeholder="Specialty"
          value={formData.specialty}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <Select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="counsellor">Counsellor</option>
        </Select>
        <Button type="submit">Add Professional</Button>
      </Form>
    </FormContainer>
  );
};

export default NewProfessionalForm;
