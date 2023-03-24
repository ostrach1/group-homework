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

function TableGenerator({ endpointName, fetcheddata }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableHeadRowValues endpointName={endpointName} />
        </TableHead>
        <TableBody>
          {fetcheddata.map((character, index) => (
            <TableRow
              key={character.id}
              // onClick={() => rowClickHandle(character.id)}
            >
              <TableCell>{character.id}</TableCell>
              <TableCell>{character.name}</TableCell>
              <TableCell>{character.created}</TableCell>
              <TableCell>{character.species}</TableCell>
              <TableCell>{character.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableGenerator;
