import React from "react";
import { Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Checkbox from "@mui/material/Checkbox";
import SearchField from "./SearchField";
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
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";

function TableGenerator({
  fetcheddata,
  columnName,
  handleCheckboxClick,
  rowClickHandle,
}) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columnName.map((column) => {
                return <TableCell key={column}>{column}</TableCell>;
              })}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {fetcheddata.map((item) => (
              <TableRow key={item.id}>
                {columnName.map((column) => (
                  <TableCell key={column}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {column === "id" ? (
                        <Checkbox
                          onChange={() => handleCheckboxClick(event, item.id)}
                        />
                      ) : null}
                      <Box onClick={() => rowClickHandle(item.id)}>
                        {column === "created" || column === "Created"
                          ? new Date(
                              item[column.toLowerCase()]
                            ).toLocaleDateString("pl-PL", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                          : item[column.toLowerCase()]}
                      </Box>
                    </Box>{" "}
                  </TableCell>
                ))}
                <TableCell>
                  <Box>
                    <ClearIcon
                      sx={{ marginRight: "10px" }}
                      onClick={() => openConfirmWindow(item.id)}
                    />
                    <ArrowForwardIcon onClick={() => rowClickHandle(item.id)} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableGenerator;
