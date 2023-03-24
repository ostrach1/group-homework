import { TableRow, TableCell } from "@mui/material";

function TableHeadRowValues({ endpointName }) {
  function itemClasses(v) {
    const character = [
      "id",
      "name",
      "status",
      "species",
      "gender",
      "moreFunction",
    ];
    const locations = ["id", "Name", "Type", "Dimensions", "moreFunction"];
    const episodes = ["id", "name", "Air Date", "Episode", "moreFunction"];
    if (v === "character") {
      return character;
    } else if (v === "location") {
      return locations;
    } else {
      return episodes;
    }
  }
  const mapped = itemClasses(endpointName).map((value) => {
    return <TableCell>{value}</TableCell>;
  });
  return <TableRow>{mapped}</TableRow>;
}

export default TableHeadRowValues;
