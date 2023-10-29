import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Components/HomeSection/Home';
import EmpLogin from './Components/Employee/EmpLogin';
import PostLogin from './Components/Employer/PostLogin';
import EmpSignUp from './Components/Employee/EmpSignUp';
import PostSignUp from './Components/Employer/PostSignUp';
import EmailVerify from './Components/Password/EmailVerify';
import VerifyOtp from './Components/Password/VerifyOtp';
import ChangePassword from './Components/Password/ChangePassword';
import SingleJob from './Components/SinglePage/SingleJob';
import PostJob from './Components/PostJob/PostJob';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/EmployeeLogin" element={<EmpLogin/>}></Route>
          <Route exact path="/signup" element={<EmpSignUp />}></Route>
          <Route exact path="/poster" element={<PostLogin />}></Route>
          <Route exact path="/postsignup" element={<PostSignUp />}></Route>
          <Route exact path="/forgot-password" element={<EmailVerify />}></Route>
          <Route exact path="/verify-otp" element={<VerifyOtp />}></Route>
          <Route exact path="/change-password" element={<ChangePassword />}></Route>
          <Route exact path='/singlejob/:_id' element={< SingleJob />}></Route>
          <Route exact path='/postjob' element={< PostJob />}></Route>
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App

