import axios from "axios";

const AddDoctor = async (doctordetails) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/adddoctor",
      doctordetails
    );
    // send information to the server
    // handle the response data
  } catch (error) {
    console.error("Error fetching doctors data:", error);
  }
};

AddDoctor();

export default AddDoctor;
