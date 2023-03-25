import React from 'react'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button, Pagination} from '@mui/material';


function EndpointPage(props) {
    const [fetcheddata, setFetchData] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { endpointName } = props;

    useEffect(() => {
      async function fetchData() {
        const response = await axios.get(`https://rickandmortyapi.com/api/${endpointName}`);
        setFetchData(response.data.results);
      }
      fetchData();
      
    }, [fetcheddata, page, rowsPerPage]);


  
  const handlePageChange = (event, value) => {
      setPage(value);
    };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };




  return (
    <div>



<TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Species</TableCell>
            <TableCell>Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fetcheddata.map((character, index) => (
            <TableRow key={character.id}>
              <TableCell>{character.name}</TableCell>
              <TableCell>{character.status}</TableCell>
              <TableCell>{character.species}</TableCell>
              <TableCell>{character.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination count={34} page={page}  onChange={handlePageChange}   rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage} sx={{color: "white"}}/>








    </div>
  )
}

export default EndpointPage