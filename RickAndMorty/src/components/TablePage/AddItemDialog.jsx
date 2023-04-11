import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";

const AddItemDialog = ({ columnName, open, handleClose }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    columnName.forEach((column) => {
      if (!values[column]) {
        newErrors[column] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const inputType = (item) => {
    if (item === "id") {
      return "number";
    } else if (
      item === "Created" ||
      item === "Air_Date" ||
      item === "created"
    ) {
      return "date";
    }
  };

  const handleSubmit = () => {
    const isValid = validate();
    if (isValid) {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Fill Below Fields to Add New Item"}</DialogTitle>
      <DialogContent>
        {columnName.map((column) => {
          return (
            <TextField
              key={`${column}`}
              type={inputType(column)}
              autoFocus
              margin="dense"
              id={`${column}`}
              label={column}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              error={errors[column]}
              helperText={errors[column] ? `${column} is required` : ""}
              onChange={handleInputChange}
            />
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="outlined" onClick={handleClose}>
          Close
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
          autoFocus
        >
          Add New Item{" "}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemDialog;
