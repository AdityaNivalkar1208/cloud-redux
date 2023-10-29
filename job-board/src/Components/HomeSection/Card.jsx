// Card.js
import React from 'react';
import './Card.css'
import {BiMap} from "react-icons/bi";
import { NavLink } from 'react-router-dom';

const Card = ({data}) => {
    

  return (
      <>

        <NavLink to={`/singlejob/${data._id}`}>
            <div className="card">

            <div className="card-body">
                <h5 className="card-title">{data.job_title}</h5>
                <h5 className="card-company">{data.job_company}</h5>
                <h5 className="card-location"><BiMap className='map'/> {data.job_location}</h5>
                <h5 className="card-type">{data.type_of_job}</h5>
                <h5 className="card-date">{data.job_posting_date}</h5>
                <h5 className="card-date">Rs.{data.package}</h5>
            </div>
              
            </div>
        </NavLink>

      </>
  );
};

export default Card;

