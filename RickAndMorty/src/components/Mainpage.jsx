import React from 'react'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button, Pagination} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material';

function Mainpage() {
const [fetchedEndpoints, setFetchEndpoints] = useState([]);
const [endpoint, setEndpoint] = useState('')
const theme = useTheme();
const colorMode = useContext(ThemeContext);


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
 <Box backgroundColor={theme.palette.background.default}

>

{
  Object.keys(fetchedEndpoints).map(v => {
    return <Button key={v} variant="contained" color="primary"   sx={{ margin: 2 }} onClick={() => handleButtonClick(`${v}`)}>  <NavLink to={`${v.toLowerCase()}`} style={{ textDecoration: 'none', color: "white"}}>{v}</NavLink></Button>
    
  })
}


</Box>
    </>
  )
}

export default Mainpage