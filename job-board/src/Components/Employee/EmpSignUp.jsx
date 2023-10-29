import React,{useState} from 'react' 
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {NavLink} from 'react-router-dom';
import './EmpSignUp.css'
import login from '../Photo/login.avif'

const EmpSignUp = () => {

    const navigate = useNavigate();
      
  const [newUser, setNewUser] = useState(
        {
            name: '',
            email: '',
            password:'',
            address: '',
            gender: '',
            phone_no: '',
          date_of_birth: '',
          skill:''
        },
    );

    


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newUser.name);
        formData.append('email', newUser.email);
        formData.append('password', newUser.password);
        formData.append('address', newUser.address);
        formData.append('gender', newUser.gender);
        formData.append('phone_no', newUser.phone_no);
        formData.append('date_of_birth', newUser.date_of_birth);
        formData.append('skill', newUser.skill);
        formData.append('resume', newUser.resume);

        await axios.post('http://localhost:5000/api/employee/createuser', formData)
             .then(res => {
                 console.log(res);
                 navigate('/EmployeeLogin')
                const response =  fetch("http://localhost:5000/api/email/registrationEmail", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                      body: JSON.stringify({name:newUser.name,email:newUser.email})
                 })
                //  const data = response.json();
                 if (response.success === 401 || !response) {
                     console.log("Error")
                 }
                 else {
                     console.log("Email Sent Successfully")
                 }

             })
             .catch(err => {
                console.log(err);
             });
    }

    
  const handlepdf = (e) => {
        setNewUser({...newUser, resume: e.target.files[0]});
    }


  const handleChange = (e) => {
    setNewUser({...newUser, [ e.target.name ]: e.target.value});
    }
    

    
  return (
      <div className="signup-design">
          
          <img src={login} alt="ttss" className='photo-signup'/>

          <div className="signup-form" >
              <h2 className="signup-heading">Welcome to JobHive</h2>
              <form onSubmit={handleSubmit} encType='multipart/form-data' className='signup-start'>
                  

            <div className="first-row">
            <div className="username column">
                <label htmlFor="name" className="read">Full Name : </label>    
                <input type="text" name="name" id="name" className="write" value={newUser.name} onChange={handleChange} required />
            </div>
            <div className="phone column">
                <label htmlFor="phone_no" className="read">Phone No</label>    
                <input type="text" name="phone_no" id="phone_no" className="write" value={newUser.phone_no} minLength={10} onChange={handleChange} required />
            </div>
                  </div>
                  

        <div className="first-row">
            <div className="email column">
                <label htmlFor="email" className="read">Email ID</label>    
                <input type="email" name="email" id="email" className="write" value={newUser.email} onChange={handleChange} required/>
            </div>
            <div className="password column">
                <label htmlFor="password" className="read">Password</label>    
                <input type="password" name="password" id="password" className="write" value={newUser.password} onChange={handleChange} required/>
            </div>
                  </div>
                  

        <div className="first-row">
            <div className="gender column">
                <label htmlFor="gender" className="read">Gender</label>    
                <div className="row" >
                    <input type="radio" name="gender" id="male" value="Male" onChange={handleChange}/> Male
                    <input type="radio" name="gender" id="female" value="Female" onChange={handleChange}/> Female
                    <input type="radio" name="gender" id="other" value="Other" onChange={handleChange}/> Other
                </div>
            </div>
            <div className="date-of--birth column">
                <label htmlFor="date_of_birth" className="read">Birth Date</label>    
                <input type="date" name="date_of_birth" id="date_of_birth" value={newUser.date_of_birth} className="write" onChange={handleChange} required/>
            </div>
                  </div>
                  

        <div className="first-row">
            <div className="address column">
                <label htmlFor="address" className="read">Address</label>
                <textarea name="address" id="address" cols="30" rows="2" className="write" value={newUser.address} onChange={handleChange} required></textarea>          
            </div>
                  </div>
                  

        <div className="first-row">
            <div className="skillresume ">
                <label htmlFor="address" className="reading">Skills</label>
                          <input type="text" name="skill" id="skill" className="writing" value={newUser.skill} onChange={handleChange} required></input>
                <label htmlFor="resume" className="reading">Resume</label>
                          
                <input type="file" name="resume" id="resume" accept="application/pdf" className='writing' onChange={handlepdf} />          
            </div>
                  </div>
                  

        <div className="signup-area">
            <button type="submit" className="sign-up--btn" >Sign Up</button>
            <p className="signup-para">Already have an account? <NavLink to="/EmployeeLogin" className="login-link">Login</NavLink></p>
        </div>
                      </form>
              </div>
    </div>
  );
}

export default EmpSignUp;
