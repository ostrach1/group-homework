import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button, Pagination, TablePagination, Typography} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
function ItemPage() {
  const [fetchedItemData, setItemFetchData] = useState([]);

  const { id, endpointName } = useParams();
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);
  let ArrofDetails = [];

  useEffect(() => {
    async function fetchData() {
      let BASE_URL = `https://rickandmortyapi.com/api/${endpointName}/${id}`;
      const response = await axios.get(BASE_URL);
      setItemFetchData(response.data);

    }
    fetchData();
  }, []);

  const fetchDetails = async (value) => {
     ArrofDetails = [];

    
    for (let url of value) {

            const response = await axios.get(url);
             ArrofDetails.push(response.data.name)
  }

  console.log(ArrofDetails)
return ArrofDetails
}




  const fetchItemDetails = (value) => {
    if(typeof value === 'object') {
      if(value.length > 2) {
        let dataofdetails = fetchDetails(value);
        

        return ArrofDetails
      }

      return value.name
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
