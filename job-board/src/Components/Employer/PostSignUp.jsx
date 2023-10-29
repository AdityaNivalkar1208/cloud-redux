import React,{useState} from 'react' 
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {NavLink} from 'react-router-dom';
import './PostSignUp.css'
import login from '../Photo/login.avif'

const PostSignup = () => {

    const navigate = useNavigate();
  
  const [newUser, setNewUser] = useState(
        {
            name: '',
            email: '',
      password: '',
            company: '',
            company_address: '',
            gender: '',
            phone_no: '',
            profile_img: '',
          date_of_birth: '',
        },
    );

    


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profile_img', newUser.profile_img);
        formData.append('name', newUser.name);
        formData.append('email', newUser.email);
        formData.append('password', newUser.password);
        formData.append('company_address', newUser.company_address);
        formData.append('company', newUser.company);
        formData.append('gender', newUser.gender);
        formData.append('phone_no', newUser.phone_no);
        formData.append('date_of_birth', newUser.date_of_birth);

        await axios.post('http://localhost:5000/api/employer/createemployer', formData)
             .then(res => {
                 console.log(res);
                 navigate('/poster')
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

    
    

  const handlePhoto = (e) => {
        setNewUser({...newUser, profile_img: e.target.files[0]});
    }

  const handleChange = (e) => {
    setNewUser({...newUser, [ e.target.name ]: e.target.value});
    }
    

    
  return (
      <div className="signup-design">
          
          <div className="signup-image">
            <img src={login} alt="dp" className='signup-photo'/>
      </div>

          <div className="signup-form" >
              <h2 className="signup-heading">Welcome To The JobHive</h2>
              <form onSubmit={handleSubmit} encType='multipart/form-data' className='signup-start'>
            <div className="first-row">
            <div className="username column">
                <label htmlFor="name" className="read">Full Name</label>    
                <input type="text" name="name" id="name" className="write" value={newUser.name} onChange={handleChange} required />
                      </div>
                
                          <div className="phone column">
                          <label htmlFor="phone_no" className="read">Phone No</label>    
                              <input type="text" name="phone_no" id="phone_no" className="write" value={newUser.phone_no} minLength={10} onChange={handleChange} required />
                              </div>
                      
                  </div>
                  

        <div className="first-row">
            <div className="email column">
                <label htmlFor="email" className="read">Email Id : </label>    
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
            <div className="profile-img column">
                <label htmlFor="profile_img" className="read">Profile</label>
              <input type="file" name="profile_img" id="profile_img" accept='.jpeg, .png, .jpg' className="write" onChange={handlePhoto} required />
                    
            </div>
            <div className="address column">
                <label htmlFor="company_address" className="read">Address</label>
                <textarea name="company_address" id="company_address" cols="30" rows="2" className="write" value={newUser.company_address} onChange={handleChange} required></textarea>          
            </div>
        </div>

        <div className="first-row">
               <div className="company column">
                <label htmlFor="company" className="read">Company</label>    
                <input type="company" name="company" id="company" className="write" value={newUser.company} onChange={handleChange} required/>
            </div>         
        </div>

        <div className="signup-area">
            <button type="submit" className="sign-up--btn" >Sign Up</button>
            <p className="signup-para">Already have an account? <NavLink to="/poster" className="login-link">Login</NavLink></p>
        </div>
                      </form>
        </div>
    </div>
  );
}

export default PostSignup;

