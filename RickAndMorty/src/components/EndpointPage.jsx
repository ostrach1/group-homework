import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button, Pagination, TablePagination, Container, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ThemeContext } from '../context/ThemeContext';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import SearchField from './SearchField';
import Checkbox from '@mui/material/Checkbox';
import { useSnackbar } from 'notistack';



function EndpointPage(props) {
  const [fetcheddata, setFetchData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { endpointName } = props;
  const navigate = useNavigate()
  const [columnName, setColumnName] = useState([]);
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);
  const [count, setCount] = useState();
  const [search, setSearch] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {

  
    const startIndex = page * rowsPerPage + 1;
    const endIndex = startIndex + rowsPerPage;
    const ids = [];
    for (let i = startIndex; i < endIndex; i++) {
      ids.push(i);
    }
    console.log(ids)

    async function fetchData(name) {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/${endpointName}/${
          name !== undefined ? `?name=${name}` : ids
        }`
      );

      const auxiliaryFetch = await axios.get(
        `https://rickandmortyapi.com/api/${endpointName}`
      );

      setFetchData(name !== undefined ? response.data.results : response.data);
      getColumnName()

      setCount(
        name !== undefined
          ? response.data.info.count
          : auxiliaryFetch.data.info.count
      );
    }
    fetchData(search);
  }, [page, rowsPerPage, endpointName, search]);
<applet></applet>

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
    ? ["id", "Episode", "Name", "Air_Date",  "Created"]
    : ["id", "Name", "Type", "Dimension",  "Created"])
  }
  const handleCheckboxClick = (event, id) => {
    console.log("IDD", id)
    if (event.target.checked) {
      setSelectedIds([...selectedIds, id]);
    }

  };

  const handleClearClick = (id) => {
    const updatedFetchedData = fetcheddata.filter(character => character.id !== id);
    setFetchData(updatedFetchedData);
    enqueueSnackbar(`Deleted character with id ${id}`, { variant: 'success' });
  };

  const removeSelectedRows = () => {
    console.log(selectedIds)
    const updatedFetchedData = fetcheddata.filter(character => !selectedIds.includes(character.id));
    setFetchData(updatedFetchedData);
    enqueueSnackbar(`Deleted characters with id ${selectedIds}`, { variant: 'success' });
  }

  const AddNewItem = () => {

  }

  return (
    <> 
    <Box backgroundColor={theme.palette.background.default}
    sx={{height: "100vh"}}
    >
      <Container> 
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
               <TableRow key={character.id} >
               {columnName.map(column => (
       <TableCell key={column}>
         <Box  sx={{display: "flex", alignItems: "center"}}>
         { column === "id" ? <Checkbox onChange={() => handleCheckboxClick(event, character.id)} /> : null }
           <Box onClick={()=> rowClickHandle(character.id)}> 
   
        {(column === 'created' || column ==='Created')
        ? new Date(character[column.toLowerCase()]).toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
        : character[column.toLowerCase()]}
       </Box></Box> </TableCell>

      ))}
 
       <TableCell><Box> <ClearIcon sx={{marginRight: "10px"}} onClick={() => handleClearClick(character.id)} />< ArrowForwardIcon onClick={()=> rowClickHandle(character.id)} /></Box></TableCell>
              </TableRow> 
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{display: "flex", justifyContent: "space-between"}}> 
      <Box sx={{display: "flex"}}>
      <SearchField search={search} setSearch={setSearch} />
      <Button variant="contained" onClick={removeSelectedRows} color="secondary" sx={{m:2, alignItems:"center"}}>Delete Selected Items</Button>
      <Button variant="contained" onClick={AddNewItem} color="secondary" sx={{m:2, alignItems:"center"}}>Add New Item</Button>
      </Box>
      {count && 
        <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handlePageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />}</Box></Container>
    </Box>






    </>
  )
}

export default EndpointPage;


