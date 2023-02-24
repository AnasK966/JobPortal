import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Search from './search';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <BodyDiv>
        <div>
          <LandingImg src='./assets/home.jpg' alt=''></LandingImg>
        </div>
        <BodySubDiv>
          <MotoDiv>
            <p>Hire or get hired...</p>
          </MotoDiv>
          <Search />
          <OptionDiv>
            <Option>
              <b>
                <OptionLink href='' onClick={() => navigate('/postCV')}>
                  Post your CV
                </OptionLink>
              </b>{' '}
              - It only takes a few seconds
            </Option>
            <Option>
              <b>
                <OptionLink href='' onClick={() => navigate('/postJob')}>
                  Employers-Post a job
                </OptionLink>
              </b>{' '}
              - Your next hire might be here
            </Option>
          </OptionDiv>
        </BodySubDiv>
      </BodyDiv>
    </div>
  );
};

export default Home;

// STYLED CSS
const LandingImg = styled.img`
  height: 100vh;
  width: 100%;
  padding: 0px;
  margin: 0px;
  opacity: 0.75;
`;

const BodyDiv = styled.div`
  position: relative;
`;

const BodySubDiv = styled.div`
  position: absolute;
  top: 20%;
  left: 30%;

  @media (max-width: 400px) {
    top: 4%;
  }

  @media (min-width: 400px) and (max-width: 600px) {
    top: 7%;
  }

  @media (min-width: 600px) and (max-width: 900px) {
    top: 15%;
  }

  @media (min-width: 900px) and (max-width: 1100px) {
    left: 17%;
  }
`;

const MotoDiv = styled.div`
  font-size: 50px;
  color: white;
  border-radius: 25px;
  padding: 5px;
  text-align: center;
`;


const OptionDiv = styled.div`
  text-align: center;
  color: black;
  margin-top: 20px;
`;

const Option = styled.p`
  padding: 10px;
`;

const OptionLink = styled.a`
  color: blue;
`;
