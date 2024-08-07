import styled from "styled-components";

export const AppointmentSetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const TimeSlotsContainer = styled.div`
  margin-top: 20px;
`;

export const TimeSlotButton = styled.button`
  margin: 5px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  position: relative;
  border-radius: 10px;
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 20px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
  }

  input,
  select,
  textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  textarea {
    resize: vertical;
  }
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

export const AppointmentsList = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;

  div {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const CancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;
