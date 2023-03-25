import {
  Table,
  TableHead,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";

import TableHeadRowValues from "./TableHeadRowValues";
import TableBodyRowValues from "./TableBodyRowValues";

function TableGenerator({
  endpointName,
  fetcheddata,
  rowClickHandle,
  setFetchData,
}) {
  const removeItem = (id) => {
    // const newItems = fetcheddata.filter((element) => element.id !== id);
    // setFetchData(newItems);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableHeadRowValues endpointName={endpointName} />
        </TableHead>

        <TableBody>
          <TableBodyRowValues
            fetcheddata={fetcheddata}
            removeItem={removeItem}
            endpointName={endpointName}
            rowClickHandle={rowClickHandle}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableGenerator;
