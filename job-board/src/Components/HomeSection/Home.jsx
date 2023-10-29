import React, { useState, useEffect } from 'react'
import './Home.css'
import Card from './Card'

function Home() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    fetch('http://localhost:5000/api/job/jobs')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-list">
      {data.map((item, index) => (
        <Card key={index} data={item} />
      ))}
    </div>
  );
}

export default Home
