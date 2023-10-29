import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import './EmailVerify.css'

const EmailVerify = () => {
    const navigate = useNavigate();
    const [ credentials, setCredentials ] = useState({email: ""});

      const handleSubmit = async (e) => {
      e.preventDefault();
        const {email} = credentials;
       const response = await fetch("http://localhost:5000/api/forgot/generateOtp", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    });
     const json = await response.json({email});
        console.log(json);
        if (json) {
          
          navigate('/verify-otp')
          
          const response =  fetch("http://localhost:5000/api/forgot/otpverification", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                      body: JSON.stringify({email})
                 })
                //  const data = response.json();
                 if (response.success === 401 || !response) {
                     alert("Something went wrong")
                 }
                 else {
                   alert("OTP has been sent to your Email Successfully...! Please Check your Email...")

                     console.log("otp Sent Successfully")
                 }
        }
        else {
          navigate('/forgot-password')
        }

  }
    
  const onChange = (e) => {
    setCredentials({...credentials, [ e.target.name ]: e.target.value});
  }

  return (
    <div>
      <div className="Emailverify">
      
              <form className="verify-box" onSubmit={handleSubmit}>
                  <label htmlFor="email" className="EmailverifyLabel">Verify Your Email Address</label>
                  <input type="email" className="EmailverifyInput"name="email" id="email" value={credentials.email} onChange={onChange} required/>
                  <button className="get-otp" type="submit">Generate OTP</button>
              </form>
        </div>
    </div>
  )
}

export default EmailVerify;