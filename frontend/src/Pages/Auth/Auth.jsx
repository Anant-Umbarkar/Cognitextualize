import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// ... keep all your styled-components here

const move = keyframes`
0%{
    opacity:0;

}
95%{
    opacity:1;

}

`;
const BackgroundBox = styled.div`
  background-color: #4d4d4d;
  height: 50vh;
  width: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 15rem auto;

  position: relative;
  border-radius: 23px;
  border: 1px solid #053271;

  .text1 {
    z-index: ${(props) => (props.clicked ? "-700" : "700")};
    transform: ${(props) =>
      props.clicked ? "translateX(0)" : "translateX(80%)"};
    transition: transform 1s ease-in-out;
    animation: ${(props) => (props.clicked ? move : "none")} 1.5s;
  }

  .text2 {
    z-index: ${(props) => (props.clicked ? "700" : "-700")};
    animation: ${(props) => (props.clicked ? "none" : move)} 1.5s;

    transform: ${(props) =>
      props.clicked ? "translateX(-80%)" : "translateX(0%)"};
    transition: transform 1s ease-in-out;
  }

  .signin {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "-600" : "500")};
    transform: ${(props) => (props.clicked ? "none" : "translateX(-50%)")};
    transition: all 1s;
  }
  .signup {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "500" : "-500")};
    transform: ${(props) => (props.clicked ? "translateX(50%)" : "none")};
    transition: all 1s;
  }
`;

const Box1 = styled.div`
  background-color: #f1fdcd;
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  transform: ${(props) =>
    props.clicked ? "translateX(90%)" : "translateX(10%)"};

  transition: transform 1s;

  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f8f9fa;

    z-index: -200;
  }

  &::before {
    top: 3rem;
    border-radius: 23px;
  }

  &::after {
    bottom: 3rem;
    border-radius: 23px 23px 0 0;
  }
`;

const Box2 = styled.div`
  background-color: #000000;
  width: 45%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;

  z-index: 600;
  transform: ${(props) =>
    props.clicked ? "translateX(-122%)" : "translateX(0%)"};
  transition: transform 1s;

  border-radius: ${(props) =>
    props.clicked ? "23px 0 0 23px" : "0 23px 23px 0"};
`;

const Form = styled.form`
  color: #1b1b1b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 4rem;

  /* z-index: 100; */
`;

const Input = styled.input`
  background-color: #fff;
  border: none;
  border-bottom: 2px solid #053271;

  padding: 1rem 2rem;
  margin: 0.5rem 0;
  width: 100%;

  &:focus {
    outline: none;
    border: none;
    border: 2px solid #053271;
  }
`;

const Button = styled.button`
  border-radius: 3px;
  padding: 1rem 3.5rem;
  margin-top: 1rem;
  border: 1px solid black;
  background-color: black;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 1px;

  box-shadow: 0 7px #999;

  &:hover {
    background-color: #1b1b1b;
  }
  &:active {
    background-color: black;

    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 2rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.2rem;
  margin: 1rem 0;
`;

const ButtonAnimate = styled.button`
  position: absolute;
  z-index: 1000;
  height: 5rem;
  width: 5rem;
  top: 70%;
  border: none;
  cursor: pointer;

  right: ${(props) => (props.clicked ? "52%" : "42%")};

  transform: ${(props) => (props.clicked ? "rotate(360deg)" : "rotate(0)")};

  transition: all 1.5s;
  background-color: transparent;

  &::before {
    content: "😜";
    font-size: 4rem;
  }

  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  position: absolute;
  z-index: 1000;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.2rem;
  color: #fff;

  .attention {
    font-size: 2.5rem;
    position: relative;
    margin-top: 2rem;
  }

  .attention-icon {
    position: absolute;
    right: ${(props) => (props.clicked ? "0" : "none")};
    top: 100%;
    font-size: 5rem;
  }
`;


function Auth() {
  const [click, setClick] = useState(false);
  const [signupData, setSignupData] = useState({ username: "", email: "", password: "" });
  const [signinData, setSigninData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSigninChange = (e) => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post("https://cognitextualize-9mqt.onrender.com/users/signup", signupData);
      const res = await axios.post("https://cognitextualize-li0n.onrender.com/users/signup", signupData);
      localStorage.setItem("token", res.data.token);
      navigate("/"); // redirect after signup
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post("https://cognitextualize-9mqt.onrender.com/users/signin", signinData);
      const res = await axios.post("https://cognitextualize-li0n.onrender.com/users/signin", signinData);
      localStorage.setItem("token", res.data.token);
      navigate("/"); // redirect after login
    } catch (err) {
      alert(err.response?.data?.message || "Signin failed");
    }
  };

  return (
    <>
      <BackgroundBox clicked={click}>
        {/* Signin Form */}
        <Form className="signin" onSubmit={handleSignin}>
          <Title>Sign In</Title>
          <Input type="email" name="email" placeholder="Email" value={signinData.email} onChange={handleSigninChange} />
          <Input type="password" name="password" placeholder="Password" value={signinData.password} onChange={handleSigninChange} />
          <Link href="#" onClick={handleClick}>Don't have an account?</Link>
          <Button type="submit">Sign In</Button>
        </Form>

        {/* Signup Form */}
        <Form className="signup" onSubmit={handleSignup}>
          <Title>Sign Up</Title>
          <Input type="text" name="username" placeholder="Username" value={signupData.username} onChange={handleSignupChange} />
          <Input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} />
          <Input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} />
          <Link href="#" onClick={handleClick}>Already have an account?</Link>
          <Button type="submit">Sign Up</Button>
        </Form>

        <Text className="text1" clicked={click}>
          <h1>Welcome!</h1>
          Don't have an account?<br />
        </Text>

        <Text className="text2" clicked={click}>
          <h1>Hi There!</h1>
          Already have an account?<br />
        </Text>

        <Box1 clicked={click} />
        <Box2 clicked={click} />
      </BackgroundBox>
    </>
  );
}

export default Auth;
