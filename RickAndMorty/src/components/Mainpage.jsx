import React from "react";
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
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

function Mainpage() {
  const [fetchedEndpoints, setFetchEndpoints] = useState([]);
  const [endpoint, setEndpoint] = useState("");
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://rickandmortyapi.com/api`);
      setFetchEndpoints(response.data);
      console.log("RESPONE", response.data);
      // Zapisywanie pobranych danych w localStorage
      localStorage.setItem("fetchedEndpoints", JSON.stringify(response.data));
      await axios.post("http://localhost:3000/", {
        setFetchEndpoints
      });
    }

   

    // Sprawdzanie, czy dane są już zapisane w localStorage i pobieranie ich
    const savedEndpoints = localStorage.getItem("fetchedEndpoints");
    if (savedEndpoints) {
      setFetchEndpoints(JSON.parse(savedEndpoints));
    } else {
      fetchData();
    }
  }, []);

  const handleButtonClick = (newEndpoint) => {
    setEndpoint(newEndpoint);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          bgcolor: theme.palette.background.default,
          m: 0,
        }}
      >
        <Box>
          {Object.keys(fetchedEndpoints).map((v) => {
            return (
              <Button
                key={v}
                variant="contained"
                color="secondary"
                sx={{ margin: 2 }}
                onClick={() => handleButtonClick(`${v}`)}
              >
                {" "}
                <NavLink
                  to={`${v.toLowerCase()}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {v}
                </NavLink>
              </Button>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default Mainpage;
