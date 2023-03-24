import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button, Pagination, TablePagination} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function EndpointPage(props) {
  const [fetcheddata, setFetchData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { endpointName } = props;
  const [idsToFetch, setIdsToFetch] = useState([1,2,3,4,5,6,7,8,9]);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://rickandmortyapi.com/api/${endpointName}/${idsToFetch}`);
      setFetchData(response.data);
      console.log(response.data)
      getIdsForPage(page, rowsPerPage);

    }
    fetchData();
  }, [page, rowsPerPage, endpointName]);

  const handlePageChange = (event, value) => {
    setPage(value);

  };  

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    getIdsForPage(page, parseInt(event.target.value, 10));

  };
  
  const getIdsForPage = (page, rowsPerPage) => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const ids = [];
    for (let i = startIndex; i < endIndex; i++) {
      ids.push(i);
    }
    console.log(ids)
    setIdsToFetch(ids);
  };

  const rowClickHandle = (id) => {
    navigate(`/${endpointName}/${id}`);

  }

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
          <TableBody>{console.log(fetcheddata)}
            {fetcheddata.map((character, index) => (
               <TableRow key={character.id} onClick={() => rowClickHandle(character.id)}>
                <TableCell >{character.id}</TableCell>
                <TableCell >{character.name}</TableCell>
                <TableCell>{character.created}</TableCell>
                <TableCell>{character.species}</TableCell>
                <TableCell>{character.gender}</TableCell>
              </TableRow> 
            ))}
          </TableBody>
        </Table>
      </TableContainer>



        <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handlePageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </div>
  )
}

export default EndpointPage;