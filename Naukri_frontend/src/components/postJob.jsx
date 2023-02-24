import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PostJob = () => {
  const navigate = useNavigate()
  const [JobAttributes, setJobAttributes] = useState({
    title: "",
    jobtype: "",
    degree: "",
    skillReq: '',
    expReq: "",
    no_of_candidates: "",
    minSal: "",
    maxSal: "",
    jobDesc: "",
  });

  const [select, setSelect] = useState()
  JobAttributes.expReq = select


  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setJobAttributes({ ...JobAttributes, [name]: value });
  };

  // let skillName, skillValue
  // const handleSkillReq = () => {
  //   skillName = e.target.name
  // }

  const handleJobForm = async(e) => {
    e.preventDefault()
    const createdBy = localStorage.getItem('user')
    handleSkills()
    console.log(JobAttributes.skillReq)
    const { title, jobtype, degree, skillReq, expReq, no_of_candidates,  minSal, maxSal , jobDesc } = JobAttributes
    
    const res = await fetch('http://localhost:3000/cmp/addPosts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title, jobtype, qualReq:{degree}, skillReq, expReq, no_of_candidates, salRange: { minSal, maxSal }, jobDesc, createdBy
      })
    })
    console.log(res)
    navigate('/')
  }

  const handleSkills = () => {
    const skillReq = JobAttributes.skillReq.split(',')
    JobAttributes.skillReq = skillReq
    console.log(JobAttributes.skillReq)
  }

  return (
    <Main>
      <JobDiv>
        <BasicInfo>
          <div>
            <h1>Provide basic information</h1>
          </div>
          <div>
            <Label>
              <b>Job Title</b>
            </Label>
            <Input
              type="text"
              name="title"
              value={JobAttributes.title}
              onChange={handleChange}
            />
          </div>
        </BasicInfo>
        <Details>
          <div>
            <h1>Include Details</h1>
          </div>
          <div>
            <Label>
              <b>What is the job type?</b>
            </Label>
            <Input
              type="text"
              name="jobtype"
              value={JobAttributes.jobtype}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>
              <b>Qualification Requirement</b>
            </Label>
            <Input
              type="text"
              name="degree"
              value={JobAttributes.degree}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>
              <b>Skill Requirement</b>
            </Label>
            <Input
              type="text"
              name="skillReq"
              value={JobAttributes.skillReq}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>
              <b>Experience Requirement</b>
            </Label>
            <Select value={select} onChange={(e)=> setSelect(e.target.value)}>
              {/* type=""
              name="expReq"
              value={JobAttributes.expReq}
              onChange={handleChange} */}
              <option value='1'>1 year</option>
              <option value='2'>2 year</option>
              <option value='3'>3 year</option>
              <option value='4'>4 year</option>
              <option value='5'>5 year</option>
              <option value='6'>6 year</option>
              <option value='7'>7 year</option>
              <option value='8'>8 year</option>
              <option value='9'>9 year</option>
              <option value='10'>10 year</option>
              </Select>
          </div>
          <div>
            <Label>
              <b>How many people you want to hire for this opening?</b>
            </Label>
            <Input
              type="number"
              name="no_of_candidates"
              value={JobAttributes.no_of_candidates}
              onChange={handleChange}
            />
          </div>
        </Details>
        <Compensation>
          <div>
            <h1>Add compensation</h1>
          </div>
          <Label>
            <b>What is the pay?</b>
          </Label>
          <CompenstaionSubDiv>
            <div>
              <Label>
                <b>Minimum</b>
              </Label>
              <Input
                type="number"
                name="minSal"
                placeholder="PKR"
                value={JobAttributes.minSal}
                onChange={handleChange}
              />
            </div>
            <div id="range">to</div>
            <div>
              <Label>
                <b>Maximum</b>
              </Label>
              <Input
                type="number"
                name="maxSal"
                placeholder="PKR"
                value={JobAttributes.maxSal}
                onChange={handleChange}
              />
            </div>
          </CompenstaionSubDiv>
        </Compensation>
        <DescDiv>
          <Label>
            <b>Job Description</b>
          </Label>
          <Form action="/">
          <TextArea
              name="jobDesc"
              value={JobAttributes.jobDesc}
              onChange={handleChange}
            >
              {" "}
            </TextArea>
            <SubmitButton onClick={handleJobForm}>
                Submit
              </SubmitButton>
          </Form>
        </DescDiv>
      </JobDiv>
    </Main>
  );
};

export default PostJob;

// STYLED CSS
const Main = styled.div`
  display: flex;
  justify-content: center;
`;

const JobDiv = styled.div`
  padding: 20px;
  display: grid;
  grid-template-rows: 180px 450px 200px;
  margin-top: 30px;
  width: 60%;
  height: 1300px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 8px;
  margin-bottom: 20px;
  margin-left: 20%;
  margin-right: 20%;
`;
const BasicInfo = styled.form`
  display: grid;
  grid-template-rows: 80px 70px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;
const Input = styled.input`
  width: 60%;
  height: 24px;
  font-size: 15px;
  padding: 3px;
  outline: none;
  border: none;

  border-bottom: 1px solid grey;
  &:focus {
    outline: none;
    border: none;
    border-bottom: 1px solid rgb(71, 71, 242);
    transition: 800ms;
  }
`;

const Details = styled.form`
  display: grid;
  grid-template-rows: 80px repeat(5, 70px);
`;

const Compensation = styled.div`
  display: grid;
  grid-template-rows: 70px 30px 80px;
`;

const CompenstaionSubDiv = styled.form`
  display: grid;
  grid-template-columns: 200px 200px 200px;
`;

const Form = styled.form`
  display: grid;
  grid-template-rows: 320px 40px;
  row-gap: 30px;
  padding: 5px;
`;

const SubmitButton = styled.button`
  font-size: 16px;
  color: white;
  background-color: blue;
  border-radius: 10px;
  border: none;
  width: 200px;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    transition: 300ms;
  }
`;

const DescDiv = styled.div`
  display: grid;
  grid-template-rows: 30px 300px;
  padding: 5px;
`;

const TextArea = styled.textarea`
  height: 300px;
  border-radius: 10px;
  padding: 10px;
  font-size: 15px;
`;

const Select = styled.select`
  width: 300px;
  padding: 5px;
  border-radius: 5px;
  font-size: 15px;

`
