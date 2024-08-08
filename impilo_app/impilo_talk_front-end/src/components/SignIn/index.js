import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  Text,
} from "./SigninElements";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSigningUp) {
        const response = await axios.post(`${apiUrl}/register`, {
          email,
          password,
        });
        console.log("Account created:", response.data);
        navigate("/"); // Redirect to the home page
      } else {
        const response = await axios.post(`${apiUrl}/login`, {
          email,
          password,
        });
        console.log("You are in:", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/"); // Redirect to the homepage
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Impilo_Talk Client</Icon>
          <FormContent>
            <Form onSubmit={handleSubmit}>
              <FormH1>
                {isSigningUp
                  ? "Create a new account"
                  : "Sign in to your account"}
              </FormH1>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FormButton type="submit">
                {isSigningUp ? "Sign Up" : "Sign In"}
              </FormButton>
              <Text onClick={() => setIsSigningUp(!isSigningUp)}>
                {isSigningUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Text>
              <Text>Forgot password</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignIn;
