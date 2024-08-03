import React from "react";
import Icon1 from "../../doctors/images.jpeg";
import Icon2 from "../../doctors/image3.jpg";
import Icon3 from "../../doctors/image2.jpg";
import {
  AboutContainer,
  DoctorsH1,
  DoctorWrapper,
  Card,
  DoctorIcon,
  DoctorH2,
  DoctorP,
} from "./AboutElements";

const AboutDrs = () => {
  return (
    <>
      <AboutContainer id="about">
        <DoctorsH1>Our Team</DoctorsH1>
        <DoctorWrapper>
          <Card>
            <DoctorIcon src={Icon1} />
            <DoctorH2>Dr Sam Molefe</DoctorH2>
            <DoctorP>
              Hello I am Doctor Sam Molefe, I am a general practitioner located
              in Senoane, Soweto.
            </DoctorP>
          </Card>
          <Card>
            <DoctorIcon src={Icon2} />
            <DoctorH2>Nurse Sihle Radebe</DoctorH2>
            <DoctorP>
              Hello I am Nurse Sihle Radebe, I am a nurse practitioner located
              located at Chiawelo Community Clinic, Soweto.
            </DoctorP>
          </Card>
          <Card>
            <DoctorIcon src={Icon3} />
            <DoctorH2>Counsellor Nkosi Buthelezi</DoctorH2>
            <DoctorP>
              Hello I am Nkosi Buthelezi, I am a health counsellor located at
              Zola Clinic,Soweto.
            </DoctorP>
          </Card>
        </DoctorWrapper>
      </AboutContainer>
    </>
  );
};

export default AboutDrs;
