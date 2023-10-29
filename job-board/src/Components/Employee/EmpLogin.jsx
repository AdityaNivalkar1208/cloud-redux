import React,{useState} from 'react' 
import {useNavigate} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import './EmpLogin.css'
import login from '../Photo/login.avif'

const EmpLogin = () => {
  const navigate = useNavigate();
  const [ credentials, setCredentials ] = useState({email: "", password: ""});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/employee/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      localStorage.setItem('isEmployee', json.isEmployee);
      navigate('/');
    }

  }

  const onChange = (e) => {
    setCredentials({...credentials, [ e.target.name ]: e.target.value});
  }




  return (
    <div className="login-design">

      <div className="login-image">
        <img src={login} alt="canva" className='logo-photo'/>
      </div>
      
      <div className="login-form">
        <form onSubmit={handleSubmit} className="login-form-start">
        <h2 className='login-span1'>Welcome To JobHive</h2>
          <div className="login-details">
            <div className="email-section">
              <label htmlFor="email" className='email-label'>Username</label>
              <input type="email" className="email-input" name="email" id="email" value={credentials.email} onChange={onChange}></input>
            </div>
            <div className="email-section">
              <label htmlFor="password" className="email-label">Password</label>
              <input type="password" className="email-input" id="password"name="password" value={credentials.password} onChange={onChange}/>
            </div>
            <button className='login-button' type="submit">Log In</button>
          </div>
        </form>
        <div className="forgot-signup">
          <NavLink className="forgot" to="/forgot-password">Forgot Password ?</NavLink>
          <p className="signup-para">Don't have an account ? <NavLink className="signup-redirect" to="/signup">Create Now !</NavLink></p>
        </div>
      </div>
    </div>
  );
}

export default EmpLogin;