import { TableRow, TableCell } from "@mui/material";

function TableHeadRowValues({ itemClasses }) {
  const mapped = itemClasses.map((value) => {
    return <TableCell>{value}</TableCell>;
  });
  return <TableRow>{mapped}</TableRow>;
}

export default TableHeadRowValues;
