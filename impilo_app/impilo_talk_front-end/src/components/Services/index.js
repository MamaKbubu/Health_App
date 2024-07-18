import React from "react";
import Icon1 from "../../images/v_consultation.jpg";
import Icon2 from "../../images/readinginfo.jpg";
import Icon3 from "../../images/medical_records.jpg";
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./ServicesElements";

const Services = () => {
  return (
    <>
      <ServicesContainer id="services">
        <ServicesH1>Our Services</ServicesH1>
        <ServicesWrapper>
          <ServicesCard>
            <ServicesIcon src={Icon1} />
            <ServicesH2>Virtual Consultations</ServicesH2>
            <ServicesP>
              This service allows patients to have virtual consultations with
              healthcare professionals (doctors, nurses, and counselors) via
              video conferencing.
            </ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon2} />
            <ServicesH2>Health Education Resources</ServicesH2>
            <ServicesP>
              This key feature will provide you, as a patient, with access to a
              library of health education resources, which include articles,
              videos, and interactive tools
            </ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon3} />
            <ServicesH2>Electronic Health Records(EHR)</ServicesH2>
            <ServicesP>
              This service allows healthcare professionals to access and update
              patients' health records electronically.
            </ServicesP>
          </ServicesCard>
        </ServicesWrapper>
      </ServicesContainer>
    </>
  );
};

export default Services;
