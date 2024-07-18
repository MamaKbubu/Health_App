import axios from "axios";
// eslint-disable-next-line

const fetchDoctors = async () => {
  try {
    const response = await axios.get("http://localhost:5000/doctors");
    console.log(response.data);
    // Handle the response data
  } catch (error) {
    console.error("Error fetching doctors data:", error);
  }
};

fetchDoctors();

export default fetchDoctors;
// Compare this snippet from impilo_app/impilo_talk_front-end/src/pages/Contact.js:
