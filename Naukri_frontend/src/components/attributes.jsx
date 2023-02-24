import { React, useState } from "react";
import styled from "styled-components";

const JobAttributes = () => {
  const [userEmployee, setEmployee] = useState({
    education: "",
    skills: "",
    work_exp: "",
    certificates: "",
  });

  const handleEmployeeSubmit = () => {
    console.log(".");
  };

  let name, value;
  const handleEmployeeChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setEmployee({...userEmployee, [name]: value})
  };

  const handleAttributesSubmit = async (e) => {
    e.preventDefault()
    handleSkills()
    handleCertificates()
    const emp_id = localStorage.getItem('user')
    const { education, skills, certificates } = userEmployee;
    const res = await fetch('http://localhost:3000/emp/addProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        education, skills, certificates, candidate_id:emp_id
      })
    })
    console.log(res)
  }

  const handleSkills = () => {
    const skills = userEmployee.skills.split(',')
    userEmployee.skills = skills
    console.log(userEmployee.skills)
  }

  const handleCertificates = () => {
    const certificates = userEmployee.certificates.split(',')
    userEmployee.certificates = certificates
    console.log(userEmployee.certificates)
  }

  const employeeErrors = {
    education: userEmployee.education.length === 0,
    skills: userEmployee.skills.length === 0,
    work_exp: userEmployee.work_exp.length === 0,
    certificates: userEmployee.certificates.length === 0,
  };

  return (
    <DetailsDiv>
      <EmployeeDetails onSubmit={handleEmployeeSubmit}>
        <div>
          <h1>Provide Academics</h1>
        </div>
        <div>
          <Label>
            <b>Education</b>
          </Label>
          <Input
            type="text"
            name="education"
            value={userEmployee.education}
            onChange={handleEmployeeChange}
            invalid={employeeErrors["cmpname"]}
          />
        </div>
        <div>
          <Label>
            <b>Skills</b>
          </Label>
          <Input
            type="text"
            name="skills"
            value={userEmployee.skills}
            onChange={handleEmployeeChange}
            invalid={employeeErrors["skills"]}
          />
        </div>
        <div>
          <Label>
            <b>Certificates</b>
          </Label>
          <Input
            type="text"
            name="certificates"
            value={userEmployee.certificates}
            onChange={handleEmployeeChange}
            invalid={employeeErrors["certificates"]}
          />
        </div>
        <SubmitButton onClick={handleAttributesSubmit}>Submit</SubmitButton>
      </EmployeeDetails>
    </DetailsDiv>
  );
};

export default JobAttributes;

// STYLED CSS
const DetailsDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const EmployeeDetails = styled.form`
  display: grid;
  grid-template-rows: repeat(3, 70px) 70px;
  width: 45%;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 60px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;
const Input = styled.input`
  width: 100%;
  height: 24px;
  font-size: 15px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${(props) => (props.invalid ? "red" : "grey")};
  &:focus {
    outline: none;
    border: none;
    border-bottom: 1px solid rgb(71, 71, 242);
    transition: 800ms;
  }
`;

const SubmitButton = styled.button`
  font-size: 16px;
  color: white;
  background-color: ${(props) => (props.disabled ? "grey" : "blue")};
  border-radius: 10px;
  border: none;
  width: 180px;
  height: 50px;
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
  &:hover {
    box-shadow: ${(props) =>
      props.disabled
        ? ""
        : "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"};
    transition: 300ms;
  }
`;
