import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './ChangePassword.css'

const ChangePassword = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;

        if (!email || !password) {
            setError("Please provide both email and password.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/forgot/resetPassword", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.status === 201) {
                navigate('/');
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (error) {
            setError("An error occurred while updating the password.");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div>
            
            <div className="verification-otp">
                <form className="otp-box" onSubmit={handleSubmit}>
                    <div className="Your-otp otp">
                        <label htmlFor="email" className="otp-label">Email Address</label>
                        <input type="email" name="email" id="email" className="otp-input" onChange={onChange} />
                    </div>
                    <div className="reenter-otp otp">
                        <label htmlFor="password" className="otp-label">Reset Password</label>
                        <input type="password" name="password" id="password" className="otp-input" onChange={onChange} />
                    </div>
                    <div className="otp-button otp">
                        <button type="submit" className="verify-button">Update Password</button>
                    </div>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}

export default ChangePassword;
