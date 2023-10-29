import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import './VerifyOtp.css'

const VerifyOtp = () => {
  
    const navigate = useNavigate();
    const [ credentials, setCredentials ] = useState({code: ""});

      const handleSubmit = async (e) => {
      e.preventDefault();
      const {code} = credentials;
    const response = await fetch("http://localhost:5000/api/forgot/verifyOtp", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({code})
    });
    const json = await response.json();
        console.log(json);
        if (json) {
          navigate('/change-password');
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
      <div className="verification-otp">

        <form className="otp-box" onSubmit={handleSubmit}>
        
          <div className="reenter-otp otp">
            <label htmlFor="code" className="otp-label">Enter 6 Digit OTP</label>
            <input type="text" name="code" id="code" className="otp-input" onChange={onChange}/>
          </div>
          <div className="otp-button otp">
            <button type="submit" className="verify-button">Verify OTP</button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default VerifyOtp