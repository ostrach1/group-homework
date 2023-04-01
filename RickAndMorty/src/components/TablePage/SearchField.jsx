import React from 'react'
import {Box, TextField } from '@mui/material';


function SearchField({search, setSearch }) {
  return (
    <Box
    component="form"
    sx={{
      "& > :not(style)": { m: 1, width: "25ch" },
    }}
    noValidate
    autoComplete="off"
  >
    <TextField
      id="outlined-controlled"
      label="search"
      value={search}
      onChange={(event) => {
        setSearch(event.target.value);
      }}
    />
  </Box>
  )
}

export default SearchField