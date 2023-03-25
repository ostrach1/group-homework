import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button, Pagination, TablePagination, Box, useTheme} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ThemeContext } from '../context/ThemeContext';


function EndpointPage(props) {
  const [fetcheddata, setFetchData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { endpointName } = props;
  const navigate = useNavigate()
  const [columnName, setColumnName] = useState([]);
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);



  useEffect(() => {

  
    const startIndex = page * rowsPerPage + 1;
    const endIndex = startIndex + rowsPerPage;
    const ids = [];
    for (let i = startIndex; i < endIndex; i++) {
      ids.push(i);
    }
    console.log(ids)

    async function fetchData() {
      const response = await axios.get(`https://rickandmortyapi.com/api/${endpointName}/${ids}`);
      setFetchData(response.data);
      getColumnName()

    }
    fetchData();
  }, [page, rowsPerPage ]);

  const handlePageChange = (event, value) => {

    setPage(value);

  };  



  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    

  };
  

  const rowClickHandle = (id) => {
    navigate(`/${endpointName}/${id}`);

  }

  const getColumnName = () => {
    setColumnName(endpointName === "character"
    ? ["id", "name", "species", "gender", "created"]
    : endpointName === "episode"
    ? ["ID", "Episode", "Name", "Air_Date",  "Created"]
    : ["ID", "Name", "Type", "Dimension",  "Created"])
  }


  return (
    <Box backgroundColor={theme.palette.background.default}

    >
      <TableContainer component={Paper}>
        
        <Table>
          <TableHead>
            <TableRow>
              {console.log("CPS",fetcheddata)}
              {columnName.map(column => {
                return <TableCell key={column}>{column}</TableCell>
              })}
            <TableCell></TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {fetcheddata.map(character => (
               <TableRow key={character.id} onClick={() => rowClickHandle(character.id)}>
               {columnName.map(column => (
       <TableCell key={column}>{character[column.toLowerCase()]}</TableCell>

      ))}
 
       <TableCell><ClearIcon sx={{marginRight: "10px"}} />< ArrowForwardIcon /></TableCell>
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
    </Box>
  )
}

export default EndpointPage;


