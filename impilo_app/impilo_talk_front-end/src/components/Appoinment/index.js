// src/components/Appointment-Setter/index.js
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  AppointmentSetterContainer,
  TimeSlotsContainer,
  TimeSlotButton,
  Modal,
  ModalContent,
  CloseButton,
  FormGroup,
  SubmitButton,
  AppointmentsList,
  CancelButton,
} from "./AppointmentElements"; // For custom styling

// Example appointments (replace with real data from your API)
const initialAppointments = [
  {
    id: "1",
    time: "09:00 AM",
    date: "2024-08-15",
    name: "John Doe",
    appointmentWith: "Doctor",
  },
];

const AppointmentSetter = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    email: "",
    appointmentWith: "",
    additionalInfo: "",
  });
  const [appointments, setAppointments] = useState(initialAppointments); // This should come from your API
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const availableTimeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  useEffect(() => {
    if (selectedDate) {
      // Replace with real API call
      const bookedSlots = ["10:00 AM", "12:00 PM"];
      const filteredSlots = availableTimeSlots.filter(
        (slot) => !bookedSlots.includes(slot)
      );
      setTimeSlots(filteredSlots);
    } else {
      setTimeSlots([]);
    }
  }, [selectedDate]);

  const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Example appointment object (replace with real API call)
    const newAppointment = {
      id: Date.now().toString(),
      time: selectedTime,
      date: selectedDate.toISOString().split("T")[0],
      name: patientDetails.name,
      appointmentWith: patientDetails.appointmentWith,
    };
    setAppointments([...appointments, newAppointment]);
    setIsModalOpen(false);
    // Call API to save the appointment
  };

  const handleCancelAppointment = (id) => {
    // Confirm cancellation and call API to remove appointment
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );
    setAppointments(updatedAppointments);
    // Call API to delete the appointment
  };

  return (
    <>
      <Navbar />
      <AppointmentSetterContainer>
        <h1>Select a Date for Your Appointment</h1>
        <Calendar onChange={setSelectedDate} value={selectedDate} />
        {selectedDate && (
          <TimeSlotsContainer>
            <h2>Select a Time Slot</h2>
            {timeSlots.length > 0 ? (
              timeSlots.map((slot, index) => (
                <TimeSlotButton
                  key={index}
                  onClick={() => handleTimeSlotClick(slot)}
                >
                  {slot}
                </TimeSlotButton>
              ))
            ) : (
              <p>No available time slots for this date.</p>
            )}
          </TimeSlotsContainer>
        )}
        {isModalOpen && (
          <Modal>
            <ModalContent>
              <CloseButton onClick={() => setIsModalOpen(false)}>
                &times;
              </CloseButton>
              <h2>Appointment Details</h2>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={patientDetails.name}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={patientDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Appointment With:</label>
                  <select
                    name="appointmentWith"
                    value={patientDetails.appointmentWith}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Counsellor">Counsellor</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <label>Additional Information:</label>
                  <textarea
                    name="additionalInfo"
                    value={patientDetails.additionalInfo}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <SubmitButton type="submit">Submit</SubmitButton>
              </form>
            </ModalContent>
          </Modal>
        )}
        <AppointmentsList>
          <h2>My Appointments</h2>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div key={appointment.id}>
                <p>{`Date: ${appointment.date}, Time: ${appointment.time}, With: ${appointment.appointmentWith}`}</p>
                <CancelButton
                  onClick={() => handleCancelAppointment(appointment.id)}
                >
                  Cancel
                </CancelButton>
              </div>
            ))
          ) : (
            <p>No appointments booked.</p>
          )}
        </AppointmentsList>
      </AppointmentSetterContainer>
    </>
  );
};

export default AppointmentSetter;
