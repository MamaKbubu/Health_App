import React from "react";

const ProfessionalList = ({ professionals }) => {
  return (
    <div>
      {professionals.map((professional) => (
        <div key={professional._id}>
          <h3>{professional.name}</h3>
          <p>Phone: {professional.phone}</p>
          <p>Specialty: {professional.specialty}</p>
          <p>Location: {professional.location}</p>
          <p>Type: {professional.type}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfessionalList;
