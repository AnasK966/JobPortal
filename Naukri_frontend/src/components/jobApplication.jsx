import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const JobApplication = () => {
  const navigate = useNavigate();
  const [details, setApplicationDetail] = useState({
    fname: '',
    lname: '',
    phone: '',
    city: '',
    resume: '',
  });

  let name, value;
  function handleChange(e) {
    name = e.target.name;
    value = e.target.value;
    setApplicationDetail({ ...details, [name]: value });
  }

  return (
    <div>
      <BasicInfoDiv action='/'>
        <div>
          <h3>Add your contact information</h3>
        </div>
        <div>
          <Label>First Name</Label>
          <Input
            name='fname'
            type='text'
            value={details.fname}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input
            name='lname'
            type='text'
            value={details.lname}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>City, State (Optional)</Label>
          <Input
            name='city'
            type='text'
            value={details.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Phone Number (Optional)</Label>
          <Input
            name='ph_no'
            type='number'
            value={details.phone}
            onChange={handleChange}
          />
        </div>
        <LabelResume htmlFor='upload'>
          <UploadImg src='/assets/upload.png'></UploadImg>
          <b>Upload your Resume</b>
        </LabelResume>
        <ResumeField
          name='file'
          id='upload'
          type='file'
          hidden
          value={details.resume}
          onChange={handleChange}
          accept='file/.sql'
        />
        <SubmitButton onClick={() => navigate('/submitted')}>
          Submit Application
        </SubmitButton>
      </BasicInfoDiv>
    </div>
  );
};

export default JobApplication;

// STYLED CSS

const BasicInfoDiv = styled.form`
  display: grid;
  grid-template-rows: 40px repeat(5, 70px) 40px;
  row-gap: 10px;
  margin-left: 30%;
  margin-top: 40px;
  margin-bottom: 2px;
  width: 40%;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 8px;
`;

const Input = styled.input`
  width: 100%;
  height: 28px;
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

const Label = styled.label`
  display: block;
`;

const ResumeField = styled.input`
  background-color: grey;
`;

const LabelResume = styled.label`
  color: blue;
  border: 1px solid grey;
  padding: 0.5rem;
  font-family: sans-serif;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-top: 1rem;
  width: 97%;
`;

const UploadImg = styled.img`
  margin-right: 20px;
  height: 25px;
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
