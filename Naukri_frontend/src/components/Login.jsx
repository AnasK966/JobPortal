import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState(false);
  const [user, setEmployee] = useState({ email: "", hash_password: "" });
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setEmployee({ ...user, [name]: value });
  };

  console.log(userStatus);

  const errors = {
    name: user.email.length === 0,
    password: user.hash_password.length === 0,
  };

  const disabled = Object.keys(errors).some((x) => errors[x]);

  const handleSubmit = (e) => {
    if (disabled) {
      e.preventDefault();
      console.log("empty fields");
      return;
    }
    e.preventDefault();
    console.log("success");
    navigate("/");
  };

  const submitEmployeeLogin = async (e) => {
    e.preventDefault();
    const { email, hash_password } = user;

    const res = await fetch("http://localhost:3000/emp/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        hash_password,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.message) {
      alert(data.message);
    } else {
      alert("Signed In");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user.emp_id);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userStatus", "true");
      localStorage.setItem("empfName", data.user.empfName);
      localStorage.setItem("emplName", data.user.emplName);
      localStorage.setItem("empCountry", data.user.empAddr.country);
      localStorage.setItem("empCity", data.user.empAddr.city);

      navigate("/");
    }
  };

  const submitEmployerLogin = async (e) => {
    e.preventDefault();
    const { email, hash_password } = user;

    const res = await fetch("http://localhost:3000/cmp/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        hash_password,
      }),
    });
    const data = await res.json();
    if (data.message) {
      console.log(data);
      alert(data.message);
    } else {
      alert("Signed In");
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user.cmp_id);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userStatus", "true");
      localStorage.setItem("cmpName", data.user.cmpName);
      localStorage.setItem("cmpCountry", data.user.cmpAddr.country);
      localStorage.setItem("cmpCity", data.user.cmpAddr.city);
      navigate("/");
    }
  };

  const employee = () => {
    return (
      <MainSubDiv>
        <EmployeeLoginDiv>
          <div>
            <h1>Login</h1>
          </div>
          <InputDiv>
            <InputSubDiv>
              <img src="/assets/mail.png" height={20} width={20}></img>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </InputSubDiv>
          </InputDiv>
          <InputDiv id="login-password-div">
            <InputSubDiv>
              <img src="/assets/password.png" height={20} width={20}></img>
              <Input
                type="password"
                name="hash_password"
                value={user.hash_password}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </InputSubDiv>
          </InputDiv>
          <div id="login-div">
            <p>
              Dont have an account?{" "}
              <SignUp onClick={() => navigate("/signUp")}>Sign Up</SignUp>
            </p>
            <SubmitButton onClick={submitEmployeeLogin}>Login</SubmitButton>
          </div>
        </EmployeeLoginDiv>
      </MainSubDiv>
    );
  };

  const employer = () => {
    return (
      <MainSubDiv>
        <EmployerLoginDiv>
          <div>
            <h1>Login</h1>
          </div>
          <InputDiv>
            <InputSubDiv>
              <img src="/assets/mail.png" height={20} width={20}></img>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </InputSubDiv>
          </InputDiv>
          <InputDiv id="login-password-div">
            <InputSubDiv>
              <img src="/assets/password.png" height={20} width={20}></img>
              <Input
                type="password"
                name="hash_password"
                value={user.hash_password}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </InputSubDiv>
          </InputDiv>
          <div id="login-div">
            <p>
              Dont have an account?{" "}
              <SignUp onClick={() => navigate("/signUp")}>Sign Up</SignUp>
            </p>
            <SubmitButton onClick={submitEmployerLogin}>Login</SubmitButton>
          </div>
        </EmployerLoginDiv>
      </MainSubDiv>
    );
  };
  return (
    <Main>
      <div>
        <Img src="/assets/login.svg.svg"></Img>
      </div>
      <BodyDiv>
        <div id="login-moto">
          <h1>
            Your next hire might
            <br /> be here...
          </h1>
        </div>
        <OptionDiv>
          <OptionSubDiv>
            <Employee>
              <input
                type="radio"
                name="employee"
                onChange={() => setUserStatus(true)}
              />
              <label id="profile-div">As an Employee</label>
            </Employee>
            <Employer>
              <input
                type="radio"
                name="employee"
                onChange={() => setUserStatus(false)}
              />
              <label id="profile-div">As an Employer</label>
            </Employer>
          </OptionSubDiv>
        </OptionDiv>
        {userStatus ? employee() : employer()}
      </BodyDiv>
    </Main>
  );
};

export default Login;

// STYLED CSS
const Img = styled.img`
  width: 100%;
  height: 100vh;
`;
const Main = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const BodyDiv = styled.div`
  // margin-top: 10%;
`;

const OptionDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const OptionSubDiv = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 80px;
`;

const Employee = styled.div`
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 20px;
  margin-top: 10%;
`;

const Employer = styled.div`
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 20px;
  margin-top: 10%;
`;

const MainSubDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const EmployeeLoginDiv = styled.form`
  display: grid;
  grid-template-rows: 70px 40px 50px 40px;
  padding: 60px;
  width: 60%;
  margin-top: 60px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 20px;
  height: 300px;
`;

const EmployerLoginDiv = styled.form`
  display: grid;
  grid-template-rows: 70px 40px 50px 40px;
  padding: 60px;
  width: 60%;
  margin-top: 60px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 20px;
  height: 300px;
`;

const Input = styled.input`
  width: 100%;
  height: 24px;
  font-size: 15px;
  padding: 3px;
  margin-left: 10px;
  outline: none;
  border: none;
  // border-bottom: 1px solid ${(props) => (props.invalid ? "red" : "grey")};
  &:focus {
    outline: none;
    border: none;
    // border-bottom: 1px solid rgb(71, 71, 242);
    transition: 800ms;
  }
`;

const InputDiv = styled.div`
  border: 1px solid grey;
  border-radius: 10px;
`;

const InputSubDiv = styled.div`
  display: flex;
  padding: 6px;
`;

const SignUp = styled.span`
  color: blue;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid blue;
  }
`;

const SubmitButton = styled.button`
  font-size: 16px;
  color: white;
  background-color: ${(props) => (props.disabled ? "grey" : "blue")};
  border-radius: 20px;
  border: none;
  width: 370px;
  height: 50px;
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
  margin-top: 20px;
  &:hover {
    box-shadow: ${(props) =>
      props.disabled
        ? ""
        : "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"};
    transition: 300ms;
  }
`;
