import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination, TablePagination } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import TableGenerator from "./TableGenerator";

function EndpointPage(props) {
  const [fetcheddata, setFetchData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { endpointName } = props;

  const [idsToFetch, setIdsToFetch] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/${endpointName}/${idsToFetch}`
      );
      setFetchData(response.data);
      getIdsForPage(page, rowsPerPage);
    }
    fetchData();
  }, [page, rowsPerPage, endpointName]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    getIdsForPage(page, parseInt(event.target.value, 10));
  };

  const getIdsForPage = (page, rowsPerPage) => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const ids = [];
    for (let i = startIndex; i < endIndex; i++) {
      ids.push(i);
    }

    setIdsToFetch(ids);
  };

  const rowClickHandle = (id) => {
    navigate(`/${endpointName}/${id}`);
  };

  return (
    <div>
      <TableGenerator
        endpointName={endpointName}
        fetcheddata={fetcheddata}
        setFetchData={setFetchData}
        rowClickHandle={rowClickHandle}
      />
      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default EndpointPage;
