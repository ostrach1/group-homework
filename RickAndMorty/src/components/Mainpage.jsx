import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button, Pagination} from '@mui/material';
import { NavLink } from 'react-router-dom';



function Mainpage() {
const [fetchedEndpoints, setFetchEndpoints] = useState([]);
const [endpoint, setEndpoint] = useState('')



    useEffect(() => {
        async function fetchData() {
          const response = await axios.get(`https://rickandmortyapi.com/api`);
          setFetchEndpoints(response.data);
        }
        fetchData();
        
      }, [fetchedEndpoints]);

    const handleButtonClick = (newEndpoint) => {
        setEndpoint(newEndpoint);


      };
    


  return (
      <>


{
  Object.keys(fetchedEndpoints).map(v => {
    return <Button key={v} variant="contained" color="primary" onClick={() => handleButtonClick(`${v}`)}>  <NavLink to={`${v.toLowerCase()}`} style={{ textDecoration: 'none', color: "white"}}>{v}</NavLink></Button>
    
  })
}



    </>
  )
}

export default Mainpage