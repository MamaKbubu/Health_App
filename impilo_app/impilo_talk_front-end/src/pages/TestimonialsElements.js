import styled from "styled-components";

export const Container = styled.div`
  padding-top: 60px; /* Adjust this value according to the height of your navbar */
  margin: 20px;
`;

export const Form = styled.form`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const Textarea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const Testimonial = styled.div`
  margin-bottom: 15px;
`;

export const TestimonialName = styled.h3`
  margin: 0 0 5px;
`;

export const TestimonialMessage = styled.p`
  margin: 0;
`;

export const TestimonialImage = styled.img`
  width: 100px; /* Adjust size as needed */
  height: 100px; /* Adjust size as needed */
  margin-right: 20px;
  border-radius: 50%; /* Make it a circle */
  object-fit: cover;
`;

export const TestimonialWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
