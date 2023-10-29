import React, {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {BiMap} from "react-icons/bi";
import './SingleJob.css'



function SingleJob() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {_id} = useParams();
  console.log(_id)

  

 useEffect(() => {
    fetch(`http://localhost:5000/api/job/find/getjob/${_id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
 }, [_id]);
  
    if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data)
  
  return (
    <>
      <div className="single-container">

        <h5 className="card-titles">{data.job_title}</h5>
        <h5 className="card-companys">{data.job_company}</h5>
        <h5 className="card-locations"><BiMap className='map'/> {data.job_location}</h5>
        <h5 className="card-types">{data.type_of_job}</h5>
        <h5 className="card-s">{data.job_description}</h5>
        <h5 className="card-dates">Post : {data.job_posting_date}</h5>
        <button className="btn">Apply</button>

      </div>
    </>
  )
}

export default SingleJob
