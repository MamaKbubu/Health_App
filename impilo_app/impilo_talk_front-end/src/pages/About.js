// frontend/src/pages/About.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import axios from "axios";

const AboutContainer = styled.div`
  padding: 80px 20px;
`;

const AboutContent = styled.div`
  margin-top: 40px;
`;

const DoctorCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f9f9f9;
`;

const DoctorName = styled.h2`
  margin-bottom: 8px;
`;

const DoctorDetails = styled.p`
  margin: 4px 0;
`;

const About = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      <Navbar />
      <AboutContainer>
        <h1>About Us</h1>
        <p>This is the About Us page.</p>
        <AboutContent>
          <h2>Our Doctors</h2>
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id}>
              <DoctorName>{doctor.name}</DoctorName>
              <DoctorDetails>Phone: {doctor.phone}</DoctorDetails>
              <DoctorDetails>Specialty: {doctor.specialty}</DoctorDetails>
              <DoctorDetails>Location: {doctor.location}</DoctorDetails>
            </DoctorCard>
          ))}
        </AboutContent>
      </AboutContainer>
    </>
  );
};

export default About;
