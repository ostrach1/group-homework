import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const AddItemDialog = ({
  columnName,
  open,
  handleClose,
  setNewData,
  newData,
  endpointName,
  count,
}) => {
  const [values, setValues] = useState([]);
  const [errors, setErrors] = useState({});
  const { submit, handleSubmit } = useForm();

  useEffect(() => {
    const storedData = localStorage.getItem(`strg-${endpointName}`);
    if (storedData) {
      setNewData(JSON.parse(storedData));
    }
  }, [endpointName]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
    console.log(values);
  };

  const onSubmit = () => {
    const isValid = validate();
    if (isValid) {
      setNewData([...newData, values]);
      localStorage.setItem(
        `strg-${endpointName}`,
        JSON.stringify([...newData, values])
      );
      handleClose();
    }
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
      return {
        inputMode: "numeric",
        pattern: "[0-9]*",
        defaultValue: count + 1,
      };
    } else if (item === "created" || item === "air_Date") {
      return { type: "date" };
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Fill Below Fields to Add New Item"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {columnName.map((column) => {
            return (
              <TextField
                key={`${column}`}
                autoFocus
                margin="dense"
                id={`${column}`}
                label={column}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={inputType(column)}
                variant="standard"
                error={errors[column]}
                helperText={errors[column] ? `${column} is required` : ""}
                onChange={handleInputChange}
              />
            );
          })}
          <DialogActions>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              autoFocus
            >
              Add New Item{" "}
            </Button>
            <Button color="secondary" variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
