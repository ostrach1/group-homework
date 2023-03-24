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
} from "@mui/material";

import TableHeadRowValues from "./TableHeadRowValues";
import TableBodyRowValues from "./TableBodyRowValues";

function TableGenerator({ endpointName, fetcheddata, rowClickHandle }) {
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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableHeadRowValues itemClasses={itemClasses(endpointName)} />
        </TableHead>

        <TableBody>
          {/* {fetcheddata.map((character, index) => (
            <TableRow
              key={character.id}
              onClick={() => rowClickHandle(character.id)}
            >
              <TableCell>{character.id}</TableCell>
              <TableCell>{character.name}</TableCell>
              <TableCell>{character.status}</TableCell>
              <TableCell>{character.species}</TableCell>
              <TableCell>{character.gender}</TableCell>
            </TableRow>
          ))} */}
          <TableBodyRowValues
            fetcheddata={fetcheddata}
            itemClasses={itemClasses}
            endpointName={endpointName}
            rowClickHandle={rowClickHandle}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableGenerator;
