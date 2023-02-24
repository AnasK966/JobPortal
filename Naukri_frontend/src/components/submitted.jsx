import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const Submitted = () => {
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams()
  // const {emp_id} = useParams()
  const emp_id = searchParams.get('emp_id')
  // const emp_id
  const job_id = searchParams.get('job_id')
  console.log(emp_id)
  console.log(job_id)

  useEffect(() => {
    async function applyJob() {
      // console.log(emp_id)
      // console.log(id)
      const res = await fetch(`http://localhost:3000/emp/apply?emp_id=${emp_id}&job_id=${job_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res)
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status} not found`);
      }
      const resData = await res.json();
      const data = await resData;
      console.log(data);
      // setJob(data.job);
    }
    applyJob();
  }, [])

  return (
    <Main>
      <SubmittedDiv>
        <div>
          <img src='/assets/submitted.png' height={200} width={200}></img>
        </div>
        <div>
          <h2>Your application has been submitted!</h2>
        </div>
        <Confirm>
          <div>
            <img src='/assets/tick.png' height={20} width={20}></img>
          </div>
          <div id='confirm'>
            You will get an email confirmation at <b>saadnadeem885@gmail.com</b>
            .
          </div>
        </Confirm>
        <Confirm>
          <div>
            <img src='/assets/tick.png' height={20} width={20}></img>
          </div>
          <div id='confirm'>Your resume has been saved to your profile.</div>
        </Confirm>
        <BackButtonDiv>
          <div>
            <Img
              src='/assets/back arrow.png'
              onClick={() => navigate('/')}
            ></Img>
          </div>
          <div id='go-back'>Go Back To Job Searching</div>
        </BackButtonDiv>
      </SubmittedDiv>
    </Main>
  );
};

export default Submitted;

// STYLED CSS
const Main = styled.div`
  display: flex;
  justify-content: center;
`;
const SubmittedDiv = styled.div`
  width: 30%;
  display: grid;
  text-align: center;
  grid-template-rows: 240px 70px 50px 50px 38px;
  row-gap: 5px;
  margin-top: 80px;
  padding: 20px;
`;

const Confirm = styled.div`
  display: flex;
  flex-direction: row;
`;

const BackButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const Img = styled.img`
  cursor: pointer;
`;
