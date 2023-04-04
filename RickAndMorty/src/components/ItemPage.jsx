import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Pagination,
  TablePagination,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { margin, typography } from "@mui/system";
import dayjs from "dayjs";

function ItemPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [details, setDetails] = useState([]);

  const { id, endpointName } = useParams();
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);

  useEffect(() => {
    async function fetchData() {
      let BASE_URL = `https://rickandmortyapi.com/api/${endpointName}/${id}`;
      const response = await axios.get(BASE_URL);

      findDetails(response.data);
      if (response.data.image) {
        axios
          .get(response.data.image, { responseType: "blob" })
          .then((response) => {
            const imageUrl = URL.createObjectURL(response.data);
            setImageUrl(imageUrl);
          });
      }
    }
    fetchData();
  }, []);
  const findDetails = (item) => {
    const newDetails = [];
    Object.entries(item).map(([key, value]) => {
      if (typeof value === "object") {
        newDetails.push(`${key}: ${value.name}`);
      } else if (key === "created") {
        const isoDate = value;
        const date = dayjs(isoDate).format("DD-MM-YYYY");
        newDetails.push(`${key}: ${date}`);
      } else if (key === "characters") {
        console.log("tuututu", key);
        newDetails.push(`${key}: guzik`);
      } else {
        newDetails.push(`${key}: ${value}`);
      }
    });

    const filteredDetails = newDetails.filter((word) => word.length < 40);
    setDetails(filteredDetails);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          height: "100vh",
          width: "100vw",
          bgcolor: theme.palette.background.default,
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "60vh",
            border: "1px solid black",
            borderRadius: 2,
            bgcolor: "white",
          }}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt="character-jpg"
              style={{ width: "20vw", height: "20vw", margin: 20 }}
            />
          )}
          <Box sx={{ margin: 2 }}>
            {details.map((item) => {
              return <Typography key={item.id}>{item}</Typography>;
            })}
            {/* <Button variant="contained">TEST</Button> */}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ItemPage;
