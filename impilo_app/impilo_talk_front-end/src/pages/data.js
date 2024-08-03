// importimage1 from "../src/images/v_consultation.jpg";
import image1 from "../doctors/images.jpeg";
import image2 from "../doctors/download.jpeg";
// frontend/src/data.js
const doctorsData = [
  {
    _id: "1",
    name: "Dr. John Doe",
    phone: "123-456-7890",
    specialty: "Cardiologist",
    location: "New York",
    image: { image1 },
    //   },
    //   export const Img = styled.img`
    //   width: 100%;
    //   margin: 0 0 10px 0;
    //   height: auto;
    //   padding-right: 0;
    _id: "2",
    name: "Dr. Jane Smith",
    phone: "987-654-3210",
    specialty: "Dermatologist",
    location: "Los Angeles",
    image: { image2 },
  },
  {
    _id: "3",
    name: "Dr. Emily Johnson",
    phone: "456-789-0123",
    specialty: "Pediatrician",
    location: "Chicago",
    image: { image1 },
  },
];

export default doctorsData;
