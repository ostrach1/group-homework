import { TableRow, TableCell } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";

import ClearIcon from "@mui/icons-material/Clear";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Checkbox from "@mui/material/Checkbox";

function TableRowAdd({
  data,
  columnName,
  handleCheckboxClick,
  rowClickHandle,
  openConfirmWindow,
  removeSelectedRows,
}) {
  return (
    <>
      {data.map((item) => (
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
                    ? new Date(item[column.toLowerCase()]).toLocaleDateString(
                        "pl-PL",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )
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
    </>
  );
}

export default TableRowAdd;
