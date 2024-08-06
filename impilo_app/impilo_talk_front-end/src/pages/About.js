// frontend/src/pages/About.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutDrs from "../components/AboutDrs";
import NewProfessionalForm from "../components/NewProfessionalForm/NewProfessionalForm";
import ProfessionalList from "../components/ProfessionalList/ProfessionalList";
import axios from "axios";

const About = () => {
  const [professionals, setProfessionals] = useState([]);

  const fetchProfessionals = async () => {
    try {
      const doctors = await axios.get(
        "http://localhost:5000/professionals/doctor"
      );
      const nurses = await axios.get(
        "http://localhost:5000/professionals/nurse"
      );
      const counsellors = await axios.get(
        "http://localhost:5000/professionals/counsellor"
      );
      setProfessionals([...doctors.data, ...nurses.data, ...counsellors.data]);
    } catch (error) {
      console.error("Error fetching professionals:", error);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  return (
    <>
      <Navbar />
      <AboutDrs />
      <NewProfessionalForm fetchProfessionals={fetchProfessionals} />
      <ProfessionalList professionals={professionals} />
      <Footer />
    </>
  );
};

export default About;

// import doctorsData from "./data"; // Adjust the path if necessary

// // Styled Components
// const AboutContainer = styled.div`
//   padding: 80px 20px;
//   background-color: #f5f5f5;
// `;

// const AboutContent = styled.div`
//   margin-top: 40px;
// `;

// const DoctorCard = styled.div`
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   padding: 16px;
//   margin-bottom: 16px;
//   background-color: #f9f9f9;
//   display: flex;
//   align-items: center;
// `;

// const DoctorImage = styled.img`
//   border-radius: 50%;
//   width: 50px;
//   height: 50px;
//   margin-right: 16px;
// `;

// const DoctorInfo = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const DoctorName = styled.h2`
//   margin-bottom: 8px;
// `;

// const DoctorDetails = styled.p`
//   margin: 4px 0;
// `;

// const FormContainer = styled.div`
//   margin-top: 40px;
//   padding: 20px;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   background-color: #fff;
// `;

// const FormTitle = styled.h2`
//   margin-bottom: 16px;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const FormLabel = styled.label`
//   margin-bottom: 8px;
//   font-weight: bold;
// `;

// const FormInput = styled.input`
//   margin-bottom: 16px;
//   padding: 8px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// `;

// const FormButton = styled.button`
//   padding: 10px 20px;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const About = () => {
//   const [doctors, setDoctors] = useState(doctorsData); // Use the imported data

//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [specialty, setSpecialty] = useState("");
//   const [location, setLocation] = useState("");
//   const [image, setImage] = useState(""); // State for image URL

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const newDoctor = {
//       _id: String(doctors.length + 1),
//       name,
//       phone,
//       specialty,
//       location,
//       image,
//     };
//     setDoctors([...doctors, newDoctor]);
//     alert("Doctor added successfully");
//     setName("");
//     setPhone("");
//     setSpecialty("");
//     setLocation("");
//     setImage(""); // Reset the image field
//   };

//   return (
//     <>
//       <Navbar />
//       <AboutContainer>
//         <h1>About Us</h1>
//         <p>This is the About Us page.</p>
//         <AboutContent>
//           <h2>Our Doctors</h2>
//           {doctors.slice(0, 3).map((doctor) => (
//             <DoctorCard key={doctor._id}>
//               <DoctorImage src={doctor.image} alt={doctor.name} />
//               <DoctorInfo>
//                 <DoctorName>{doctor.name}</DoctorName>
//                 <DoctorDetails>Phone: {doctor.phone}</DoctorDetails>
//                 <DoctorDetails>Specialty: {doctor.specialty}</DoctorDetails>
//                 <DoctorDetails>Location: {doctor.location}</DoctorDetails>
//               </DoctorInfo>
//             </DoctorCard>
//           ))}
//         </AboutContent>
//         <FormContainer>
//           <FormTitle>Add a Doctor</FormTitle>
//           <Form onSubmit={handleSubmit}>
//             <FormLabel>Name:</FormLabel>
//             <FormInput
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />

//             <FormLabel>Phone:</FormLabel>
//             <FormInput
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//             />

//             <FormLabel>Specialty:</FormLabel>
//             <FormInput
//               type="text"
//               value={specialty}
//               onChange={(e) => setSpecialty(e.target.value)}
//               required
//             />

//             <FormLabel>Location:</FormLabel>
//             <FormInput
//               type="text"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               required
//             />

//             <FormLabel>Image URL:</FormLabel>
//             <FormInput
//               type="text"
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//               required
//             />

//             <FormButton type="submit">Add Doctor</FormButton>
//           </Form>
//         </FormContainer>
//       </AboutContainer>
//     </>
//   );
// };
