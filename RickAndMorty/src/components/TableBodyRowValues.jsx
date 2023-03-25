import { TableRow, TableCell } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function TableBodyRowValues({
  fetcheddata,
  removeItem,
  endpointName,
  rowClickHandle,
}) {
  if (endpointName === "character") {
    return (
      <>
        {fetcheddata.map((character) => (
          <TableRow
            key={character.id}
            onClick={() => rowClickHandle(character.id)}
          >
            <TableCell>{character.id}</TableCell>
            <TableCell>{character.name}</TableCell>
            <TableCell>{character.status}</TableCell>
            <TableCell>{character.species}</TableCell>
            <TableCell>{character.gender}</TableCell>
            <TableCell>
              <DeleteIcon onClick={removeItem()} />
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  } else if (endpointName === "location") {
    return (
      <>
        {fetcheddata.map((location, index) => (
          <TableRow
            key={location.id}
            onClick={() => rowClickHandle(location.id)}
          >
            <TableCell>{location.id}</TableCell>
            <TableCell>{location.name}</TableCell>
            <TableCell>{location.type}</TableCell>
            <TableCell>{location.dimension}</TableCell>
            <TableCell>
              <DeleteIcon />
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  } else {
    return (
      <>
        {fetcheddata.map((episodes) => (
          <TableRow
            key={episodes.id}
            onClick={() => rowClickHandle(episodes.id)}
          >
            <TableCell>{episodes.id}</TableCell>
            <TableCell>{episodes.name}</TableCell>
            <TableCell>{episodes.air_date}</TableCell>
            <TableCell>{episodes.episode}</TableCell>
            <TableCell>
              <DeleteIcon />
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  }
}

export default TableBodyRowValues;
