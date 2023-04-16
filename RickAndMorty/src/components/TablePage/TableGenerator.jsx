import React from "react";
import TableRowAdd from "./TableRowAdd";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";

function TableGenerator({
  fetcheddata,
  columnName,
  handleCheckboxClick,
  rowClickHandle,
  openConfirmWindow,
  newData,
  removeSelectedRows,
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
            <TableRowAdd
              data={fetcheddata}
              columnName={columnName}
              handleCheckboxClick={handleCheckboxClick}
              rowClickHandle={rowClickHandle}
              openConfirmWindow={openConfirmWindow}
              removeSelectedRows={removeSelectedRows}
            />

            <TableRowAdd data={newData} columnName={columnName} />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableGenerator;
