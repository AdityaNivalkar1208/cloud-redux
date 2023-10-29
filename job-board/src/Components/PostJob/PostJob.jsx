import React, {useState} from 'react';
import './PostJob.css'
import {useNavigate} from 'react-router-dom';


function PostJob() {
const navigate = useNavigate()

  const [formData, setFormData] = useState({
    job_title: '',
    job_company: '',
    job_description: '',
    job_posting_date: '',
    job_location: '',
    type_of_job: '',
    package: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/job/createjob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const savedJob = await response.json();
          console.log('Job created:', savedJob);
          navigate('/')
      } else {
        throw new Error('Failed to create job');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="postjob-container">
        <form onSubmit={handleSubmit} className="form-fill">
          <div className="box-level">
            <label htmlFor="job_title" className="job_title">Job Title : </label>
            <input
              type="text"
              name="job_title" className="job-input"
              value={formData.job_title}
              onChange={handleInputChange}
            />
          </div>

          <div className="box-level">
            <label htmlFor="job_title" className="job_title">Company Name : </label>
            <input
              type="text" className="job-input"
              name="job_company"
              value={formData.job_company}
              onChange={handleInputChange}
            />
          </div>

          <div className="box-level">
            <label htmlFor="job_title" className="job_title">Job Description : </label>
            <input
              type="text"
              name="job_description" className="job-input"
              value={formData.job_description}
              onChange={handleInputChange}
            />
          </div>

          <div className="box-level">
            <label htmlFor="job_title" className="job_title">Job Posting : </label>
            <input
              type="text"
              name="job_posting_date" className="job-input"
              value={formData.job_posting_date}
              onChange={handleInputChange}
            />
          </div>

          <div className="box-level">
            <label htmlFor="job_title" className="job_title">Job Location : </label>
            <input
              type="text"
              name="job_location" className="job-input"
              value={formData.job_location}
              onChange={handleInputChange}
            />
          </div>

          <div className="box-level">
            <label htmlFor="job_title" className="job_title">Job Type : </label>
            <input
              type="text"
              name="type_of_job" className="job-input"
              value={formData.type_of_job}
              onChange={handleInputChange}
            />
          </div>

          <div className="box-level">
            <label htmlFor="job_title" className="job_title">Job package : </label>
            <input
              type="text" className="job-input"
              name="package"
              value={formData.package}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className='submit'>Create Job</button>
        </form>
      </div>
    </>
  );
}

export default PostJob;
