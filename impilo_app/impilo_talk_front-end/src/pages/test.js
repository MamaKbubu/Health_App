// import React, { useState } from "react";
// import axios from "axios";
import fetchDoctors from "../utilities/api_routes";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
// import axios from "axios";

const FormContainer = styled.div`
  padding: 80px 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
`;

const FormTitle = styled.h1`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormLabel = styled.label`
  font-size: 18px;
`;

const FormInput = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const FormButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      fetchDoctors("POST", {
        name,
        phone,
        specialty,
        location,
      });
      //   await axios.post("http://localhost:5000/doctors", {
      //     name,
      //     phone,
      //     specialty,
      //     location,
      //   });
      alert("Doctor added successfully");
      setName("");
      setPhone("");
      setSpecialty("");
      setLocation("");
    } catch (error) {
      console.error("There was an error adding the doctor!", error);
    }
  };

  return (
    <>
      <Navbar />
      <FormContainer>
        <FormTitle>Add a Doctor</FormTitle>
        <Form onSubmit={handleSubmit}>
          <FormLabel>Name:</FormLabel>
          <FormInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <FormLabel>Phone:</FormLabel>
          <FormInput
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <FormLabel>Specialty:</FormLabel>
          <FormInput
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          />

          <FormLabel>Location:</FormLabel>
          <FormInput
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <FormButton type="submit">Add Doctor</FormButton>
        </Form>
      </FormContainer>
    </>
  );
};

export default AddDoctor;
