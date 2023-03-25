import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button, Pagination, TablePagination, Typography, useTheme} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function ItemPage() {
  const [fetchedItemData, setItemFetchData] = useState([]);

  const { id, endpointName } = useParams();
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);


  useEffect(() => {
    async function fetchData() {
      let BASE_URL = `https://rickandmortyapi.com/api/${endpointName}/${id}`;
      const response = await axios.get(BASE_URL);
      setItemFetchData(response.data);

    }
    fetchData();
  }, []);

  const fetchItemDetails = (value) => {
    if(typeof value === 'object') {

    } else 
    return value
  }

  return (
    <div>
    {Object.entries(fetchedItemData).map(([key, value]) => (
      <Typography key={key} sx={{wordWrap: "break-word"}}>
        {key}: {fetchItemDetails(value) }
        
      </Typography>
    ))}

    <Button variant="contained" >TEST</Button>
  </div>
  )
}

export default ItemPage;



// if(typeof value1 === 'object' && value1 !== null) {
                
//   let names = "";
//   for (let url of value1) {
//       const response = await fetch(url);
//       const data = await response.json();
//       if(data.name !== 'undefined' && elem !== 'films')
//       names += data.name + ", ";
//       else {
          
//           names += data.title + ", ";
//       }