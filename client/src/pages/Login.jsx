import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import ChatBubble from "../assets/chat-bubble.png";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action='' onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
            <img src={ChatBubble} alt='Chat Bubble' />
            <h1>ChatHub</h1>
          </div>
          <input type='text' placeholder='Username' name='username' onChange={(e) => handleChange(e)} min='3' />
          <input
            type='password'
            placeholder='Password'
            name='password'
            autoComplete='current-password'
            onChange={(e) => handleChange(e)}
          />
          <button type='submit'>Log In</button>
          <span>
            New Here?
            <Link to='/register' style={{ marginLeft: "6px" }}>
              Create One.
            </Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

export default Login;

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(45deg, #4e0eff, #997af0);

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
    max-width: 400px; /* Limit the width of the form */
    width: 90%; /* Make the form responsive */
  }

  input {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #997af0;
    }
  }

  span {
    color: white;
    text-transform: uppercase;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
      &:hover {
        color: #997af0;
      }
    }
  }

  /* Media Queries for Responsiveness */
  @media (max-width: 1024px) {
    form {
      padding: 4rem;
    }
  }

  @media (max-width: 768px) {
    form {
      padding: 3rem;
      gap: 1.5rem;
    }
    .brand {
      flex-direction: column; /* Stack brand elements */
      img {
        height: 4rem;
      }
      h1 {
        font-size: 1.5rem; /* Adjust font size for smaller screens */
      }
    }
    input {
      font-size: 0.9rem; /* Adjust font size for inputs */
    }
    button {
      font-size: 0.9rem; /* Adjust font size for button */
    }
    span {
      font-size: 0.9rem; /* Adjust font size for span */
    }
  }
`;
