import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchTitle, setSearchTitle] = useState();
  const [searchLocation, setSearchLocation] = useState();
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSearchLocation(e.target.value);
  };
  const handleClick = () => {
    navigate('/emp/search?s=' + searchTitle);
  };

  return (
    <InputDiv>
      <div>
        <InputField
          type='text'
          placeholder='Job title,keywords or company'
          onChange={handleTitleChange}
        />
      </div>
      {/* <div>
        <InputField
          type='text'
          placeholder='City,province or region'
          onChange={handleLocationChange}
        />
      </div> */}
      <div>
        <FindButton onClick={handleClick}>
          <b>Find Jobs</b>
        </FindButton>
      </div>
    </InputDiv>
  );
};

export default Search;

// STYLED CSS

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 200px;
  padding: 5px;
  width: 100%;

  @media (max-width: 400px) {
    flex-direction: column;
    margin-top: 0px;
  }

  @media (min-width: 400px) and (max-width: 600px) {
    flex-direction: column;
    margin-top: 0px;
  }
  @media (min-width: 600px) and (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    margin-top: 10px;
  }

  @media (min-width: 900px) {
    margin-top: 50px;
  }
`;

const InputField = styled.input`
  margin-left: 10px;
  margin-right: 10px;
  height: 26px;
  width: 350px;
  border: 1px grey solid;
  border-radius: 8px;
  padding: 4px 20px 5px;
  font-size: 15px;

  @media (max-width: 400px) {
    width: 150px;
    margin-top: 10px;
  }

  @media (min-width: 400px) and (max-width: 600px) {
    width: 250px;
    margin-top: 10px;
  }

  @media (min-width: 600px) and (max-width: 900px) {
    margin-top: 10px;
    width: 340px;
  }
  @media (min-width: 900px) and (max-width: 1100px) {
    width: 300px;
  }
  &:focus {
    outline: none;
    border: 1px solid rgb(71, 71, 242);
    transition: 800ms;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

const FindButton = styled.button`
  border: 1px solid black;
  color: white;
  background-color: blue;
  padding: 7px 12px 8px;
  width: 100px;
  border-radius: 10px;
  border-color: blue;
  font-size: 15px;
  &: hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition: 500ms;
    cursor: pointer;
  }

  @media (max-width: 400px) {
    width: 200px;
    margin-top: 10px;
    margin-left: 10px;
  }

  @media (min-width: 400px) and (max-width: 600px) {
    width: 290px;
    margin-top: 10px;
    margin-left: 10px;
  }

  @media (min-width: 600px) and (max-width: 900px) {
    margin-top: 10px;
    width: 380px;
  }
`;
