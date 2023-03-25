import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function StateTextFields({ search, setSearch }) {
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
  );
}
