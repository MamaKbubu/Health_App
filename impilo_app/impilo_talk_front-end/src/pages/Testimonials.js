import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Container,
  Form,
  Label,
  Input,
  Textarea,
  Button,
  Testimonial,
  TestimonialName,
  TestimonialMessage,
  TestimonialImage,
  TestimonialWrapper,
} from "./TestimonialsElements";
import testimonialsData from "./testimonials.json"; // Import the JSON file
import image from "../images/Quote.jpg";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load testimonials from the JSON file
    setTestimonials(testimonialsData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTestimonial = { name, message };
    setTestimonials([...testimonials, newTestimonial]);
    setName("");
    setMessage("");
  };

  return (
    <>
      <Navbar />
      <Container>
        <h1>Testimonials</h1>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="message">Message:</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Submit</Button>
        </Form>
        <div>
          <h2>Submitted Testimonials</h2>
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialWrapper key={index}>
              <TestimonialImage src={image} />
              <Testimonial>
                <TestimonialName>{testimonial.name}</TestimonialName>
                <TestimonialMessage>{testimonial.message}</TestimonialMessage>
              </Testimonial>
            </TestimonialWrapper>
          ))}
        </div>
        <Footer />
      </Container>
    </>
  );
};

export default Testimonials;
