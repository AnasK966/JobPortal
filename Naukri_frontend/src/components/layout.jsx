import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './layout.css';

function Layout() {
  const [userStatus, setUserStatus] = useState(false);
  const [role, setRole] = useState();
  const [optionsStatus, setOptionStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUserStatus(true);
    }
    const role = localStorage.getItem('role');
    setRole(role);

    const userStatus = localStorage.getItem('userStatus')
    setUserStatus(userStatus)
  }, []);


  function handleOption() {
    setOptionStatus(!optionsStatus);
  }

  function navigateProfile() {
    const role = localStorage.getItem('role');
    const emp_id = localStorage.getItem('user');
    const cmp_id = localStorage.getItem('user');
    console.log(cmp_id)
    if (role === 'emp') {
      navigate(`/empDashboard/${emp_id}`);
    } else {
      navigate('/cmpDashboard?s=' + cmp_id);
    }
  }

  function logOut() {
    localStorage.removeItem('role')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.setItem('userStatus', 'false')
    navigate('/')
  }

  function NotSignedIn() {
    return (
      <HeaderSubCont2>
        {/* <HeaderSubDiv className='header-sub-div'>
          <HeaderSubDivLink href='' onClick={() => navigate('/postCV')}>
            Submit your CV
          </HeaderSubDivLink>
        </HeaderSubDiv> */}
        <HeaderSubDiv className='header-sub-div'>
          <HeaderSubDivLink
            id='login-signup'
            href=''
            onClick={() => navigate('/signUp')}
          >
            Sign Up
          </HeaderSubDivLink>
          <div> / </div>
          <HeaderSubDivLink
            id='login-signup'
            href=''
            onClick={() => navigate('emp/signin')}
          >
            Log In
          </HeaderSubDivLink>
        </HeaderSubDiv>
        <HeaderSubDiv className='header-sub-div'>
          <HeaderSubDivLink href='' onClick={() => navigate('/postJob')}>
            Employer / Post Job
          </HeaderSubDivLink>
        </HeaderSubDiv>
      </HeaderSubCont2>
    );
  }

  function SignedIn() {
    if (role === 'emp') {
      return (
        <HeaderSubCont2>
        <div>
          <HeaderSubDiv className='header-sub-div'>
            <HeaderSubDivLink className='header-sub-div'>
              <AccountImg
                src='/assets/account.png'
                onClick={() => navigateProfile()}
                height={25}
              ></AccountImg>
            </HeaderSubDivLink>
            <AccountArrowDiv>
              <ArrowImg
                src='/assets/down_arrow.png'
                onClick={() => handleOption()}
              ></ArrowImg>
            </AccountArrowDiv>
          </HeaderSubDiv>
          <EmpOptionDiv disabled={optionsStatus}>
            <Option>
              <li>
                <LiAnchor onClick={() => navigate('/jobAttributes')}>Profile</LiAnchor>
              </li>
              <li>
                <LiAnchor onClick={() => logOut()}>Log Out</LiAnchor>
              </li>
            </Option>
          </EmpOptionDiv>
        </div>
          <HeaderSubDiv className='header-sub-div'>
            <HeaderSubDivLink href='' onClick={() => navigate('/postCV')}>
              Submit your CV
            </HeaderSubDivLink>
          </HeaderSubDiv>
        </HeaderSubCont2>
      );
    } else if(role==='cmp') {
      return (
        <HeaderSubCont2>
        <div>
          <HeaderSubDiv className='header-sub-div'>
            <HeaderSubDivLink className='header-sub-div'>
              <AccountImg
                src='/assets/account.png'
                onClick={() => navigateProfile()}
                height={25}
              ></AccountImg>
            </HeaderSubDivLink>
            <AccountArrowDiv>
              <ArrowImg
                src='/assets/down_arrow.png'
                onClick={() => handleOption()}
              ></ArrowImg>
            </AccountArrowDiv>
          </HeaderSubDiv>
          <CmpOptionDiv disabled={optionsStatus}>
            <Option>
              <li>
                <LiAnchor onClick={()=> logOut()}>Log Out</LiAnchor>
              </li>
            </Option>
          </CmpOptionDiv>
        </div>
          <HeaderSubDiv className='header-sub-div'>
            <HeaderSubDivLink href='' onClick={() => navigate('/postJob')}>
              Employer/Post Job
            </HeaderSubDivLink>
          </HeaderSubDiv>
        </HeaderSubCont2>
      );
    }
  }

  // function SignedIn() {
  //   return (
  //     <HeaderSubCont2>
  //       <div>
  //         <HeaderSubDiv className='header-sub-div'>
  //           <HeaderSubDivLink className='header-sub-div'>
  //             <AccountImg
  //               src='/assets/account.png'
  //               onClick={() => navigateProfile()}
  //               height={25}
  //             ></AccountImg>
  //           </HeaderSubDivLink>
  //           <AccountArrowDiv>
  //             <ArrowImg
  //               src='/assets/down-arrow.png'
  //               onClick={() => handleOption()}
  //             ></ArrowImg>
  //           </AccountArrowDiv>
  //         </HeaderSubDiv>
  //         <OptionDiv disabled={optionsStatus}>
  //           <Option>
  //             <li>
  //               <LiAnchor>Profile</LiAnchor>
  //             </li>
  //             <li>
  //               <LiAnchor>Log Out</LiAnchor>
  //             </li>
  //           </Option>
  //         </OptionDiv>
  //       </div>
  //       <HeaderSubDiv className='header-sub-div'>
  //         <HeaderSubDivLink href='' onClick={() => navigate('/postCV')}>
  //           Submit your CV
  //         </HeaderSubDivLink>
  //       </HeaderSubDiv>
  //     </HeaderSubCont2>
  //   );
  // }

  return (
    <div>
      <HeaderContainer>
        <HeaderSubCont1>
          <LogoCont>
            <LogoName><img src='/assets/logo-no-background.png' height={60} width={140}></img></LogoName>
            {/* <span>
              <img src='/assets/logo-black.png' alt=''></img>
            </span> */}
          </LogoCont>
          <HeaderSubDiv className='header-sub-div'>
            <HeaderSubDivLink onClick={() => navigate('/')} href=''>
              Home
            </HeaderSubDivLink>
          </HeaderSubDiv>
          <HeaderSubDiv className='header-sub-div'>
            <HeaderSubDivLink
              href=''
              onClick={() => navigate('/emp/jobs')}
            >
              Find Jobs
            </HeaderSubDivLink>
          </HeaderSubDiv>
        </HeaderSubCont1>
        {userStatus ==='true' ? SignedIn() : NotSignedIn()}
      </HeaderContainer>
      <Main>
        <Outlet />
      </Main>
      {/* <FooterDiv>
        <div>
          <FooterItem>
            <FooterItemSubDiv>
              {' '}
              <FooterImg src='/assets/browse.png'></FooterImg>
            </FooterItemSubDiv>
            <FooterItemSubDiv>
              {' '}
              <FooterLink href=''>Browse Jobs</FooterLink>
            </FooterItemSubDiv>
          </FooterItem>
          <FooterItem>
            <FooterItemSubDiv>
              {' '}
              <FooterImg src='/assets/browse.png'></FooterImg>
            </FooterItemSubDiv>
            <FooterItemSubDiv>
              {' '}
              <FooterLink>Browse Companies</FooterLink>
            </FooterItemSubDiv>
          </FooterItem>
        </div>
        <div>
          <FooterItem>
            <FooterItemSubDiv>
              {' '}
              <FooterImg src='/assets/about.png'></FooterImg>
            </FooterItemSubDiv>
            <FooterItemSubDiv>
              {' '}
              <FooterLink href=''>About</FooterLink>
            </FooterItemSubDiv>
          </FooterItem>
          <FooterItem>
            <FooterItemSubDiv>
              {' '}
              <FooterImg src='/assets/contact.png'></FooterImg>
            </FooterItemSubDiv>
            <FooterItemSubDiv>
              {' '}
              <FooterLink href=''>Contact</FooterLink>
            </FooterItemSubDiv>
          </FooterItem>
        </div>
      </FooterDiv> */}
    </div>
  );
}

export default Layout;

// Styled CSS
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // border-bottom: 1px solid grey;
  // background-color: #f0eded;
  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    background-color: #f0eded;
  }
`;

const HeaderSubCont1 = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 900px) {
    flex-direction: column;
    font-size: 20px;
  }
`;
const HeaderSubCont2 = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 900px) {
    flex-direction: column;
    font-size: 20px;
  }
`;

const AccountArrowDiv = styled.div`
  margin-left: 20px;
  margin-top: 7px;
`;

const LogoCont = styled.div`
  padding-top: 18px;
  padding-left: 20px;
  padding-right: 20px;
  width: 150px;
  @media (max-width: 900px) {
    width: 100%;
    text-align: center;
    padding-left: 0;
  }
`;

const LogoName = styled.div`
  font-size: 40px;
`;

const HeaderSubDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 40px 12px 20px;
`;

const HeaderSubDivLink = styled.a`
  text-decoration: none;
  color: black;
`;

const AccountImg = styled.img`
  cursor: pointer;
`;

const ArrowImg = styled.img`
  height: 15px;
  width: 15px;
  cursor: pointer;
`;

const CmpOptionDiv = styled.div`
  display: ${(props) => (props.disabled ? '' : 'none')};
  border: 1px solid black;
  height: 40px;
  border: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #f0eded;
  position: absolute;
  top: 12%;
  left: 83%;
  z-index: 5;
  // transition-delay: 1500ms;
`;

const EmpOptionDiv = styled.div`
  display: ${(props) => (props.disabled ? '' : 'none')};
  border: 1px solid black;
  height: 80px;
  border: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #f0eded;
  position: absolute;
  top: 12%;
  left: 83%;
  z-index: 5;
  // transition-delay: 1500ms;
`;

const Option = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const LiAnchor = styled.a`
  display: block;
  padding: 10px;
  cursor: pointer;
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
`;

const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #f0eded;
  margin-top: auto;
  width: 100%;
`;

const FooterItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 100px;
`;

const FooterItemSubDiv = styled.div`
  padding: 3px;
`;

const FooterImg = styled.img`
  height: 20px;
  background-color: white;
`;

const FooterLink = styled.a`
  text-decoration: none;
  margin-top: 5px;
  color: black;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;