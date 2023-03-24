import { TableRow, TableCell } from "@mui/material";

function TableHeadRowValues({ endpointName }) {
  const character = ["id", "name", "status", "species", "gender"];
  const locations = ["id", "Name", "Type", "Dimensions"];
  const episodes = ["id", "name", "Air Date", "Episode"];
  if (endpointName === "character") {
    const mappedClasses = character.map((value) => {
      return <TableCell>{value}</TableCell>;
    });
    return <TableRow>{mappedClasses}</TableRow>;
  } else if (endpointName === "location") {
    const mappedClasses = locations.map((value) => {
      return <TableCell>{value}</TableCell>;
    });
    return <TableRow>{mappedClasses}</TableRow>;
  } else {
    const mappedClasses = episodes.map((value) => {
      return <TableCell>{value}</TableCell>;
    });
    return <TableRow>{mappedClasses}</TableRow>;
  }
}

export default TableHeadRowValues;
