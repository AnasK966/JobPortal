import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout.jsx';
import Home from './components/home.jsx';
import Jobs from './components/Jobs.jsx';
import JobDetail from './components/jobDetail.jsx';
import JobApplication from './components/jobApplication.jsx';
import Submitted from './components/submitted.jsx';
import PostCV from './components/postCV.jsx';
import PostJob from './components/postJob.jsx';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';
import React, { useEffect } from 'react';
import SearchResults from './components/searchResults.jsx';
import JobAttributes from './components/attributes.jsx';
import EmpProfile from './components/empProfile.jsx';
import CmpProfile from './components/cmpDashboard.jsx';
import AppliedJobDetail from './components/appliedJobDetail.jsx';
import AppliedCandidates from './components/appliedCandidates.jsx';
import EmpDashboard from './components/empDashboard.jsx';
import CmpDashboard from './components/cmpDashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='emp/jobs' element={<Jobs />} />
          {/* <Route path='emp/jobDetail/:id' element={<JobDetail />} /> */}
          <Route path='emp/signin' element={<Login />} />
          <Route path='emp/jobDetail/:id' element={<JobDetail />} />
          <Route path='jobapply/:jobId' element={<JobApplication />} />
          <Route path='emp/apply/' element={<Submitted />} />
          <Route path='postCV' element={<PostCV />} />
          <Route path='postJob' element={<PostJob />} />
          <Route path='signUp' element={<SignUp />} />
          <Route path='emp/search' element={<SearchResults />} />
          <Route path='jobAttributes' element={<JobAttributes />} />
          <Route path='empDashboard/:emp_id' element={<EmpDashboard />} />
          <Route path='appliedJobDetail/:id' element={<AppliedJobDetail />} />
          <Route path='cmpDashboard' element={<CmpDashboard />} />
          <Route path='appliedCandidates/:id' element={<AppliedCandidates />} />
          <Route path='empProfile/:id' element={<EmpProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
