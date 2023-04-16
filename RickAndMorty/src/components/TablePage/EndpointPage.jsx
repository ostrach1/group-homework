import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Button,
  TablePagination,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import SearchField from "./SearchField";
import { useSnackbar } from "notistack";
import TableGenerator from "./TableGenerator";
import AddItemDialog from "./AddItemDialog";

function EndpointPage(props) {
  const [fetcheddata, setFetchData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { endpointName } = props;
  const navigate = useNavigate();
  const [columnName, setColumnName] = useState([]);
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);
  const [count, setCount] = useState();
  const [search, setSearch] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [RemovingItemPopup, setRemovingItemPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [AddItemPopup, setAddItemPopup] = useState(false);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const startIndex = page * rowsPerPage + 1;
    const endIndex = startIndex + rowsPerPage;
    const ids = [];
    for (let i = startIndex; i < endIndex; i++) {
      ids.push(i);
    }

    async function fetchData(name) {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/${endpointName}/${
          name !== undefined ? `?name=${name}` : ids
        }`
      );

      const auxiliaryFetch = await axios.get(
        `https://rickandmortyapi.com/api/${endpointName}`
      );

      setFetchData(name !== undefined ? response.data.results : response.data);
      getColumnName();
      console.log(endpointName);

      setCount(
        name !== undefined
          ? response.data.info.count + newData.length
          : auxiliaryFetch.data.info.count + newData.length
      );
    }
    fetchData(search);
  }, [page, rowsPerPage, endpointName, search, newData]);
  <applet></applet>;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowClickHandle = (id) => {
    navigate(`/${endpointName}/${id}`);
  };

  const getColumnName = () => {
    setColumnName(
      endpointName === "character"
        ? ["id", "name", "species", "gender", "created"]
        : endpointName === "episode"
        ? ["id", "Episode", "Name", "Air_Date", "Created"]
        : ["id", "Name", "Type", "Dimension", "Created"]
    );
  };
  const handleCheckboxClick = (event, id) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleClearClick = (id) => {
    handleClose();
    const updatedFetchedData = fetcheddata.filter(
      (character) => character.id !== id
    );
    setFetchData(updatedFetchedData);
    enqueueSnackbar(`Deleted character with id ${id}`, { variant: "success" });
  };

  const removeSelectedRows = () => {
    const updatedFetchedData = fetcheddata.filter(
      (character) => !selectedIds.includes(character.id)
    );
    setFetchData(updatedFetchedData);
    enqueueSnackbar(`Deleted characters with id ${selectedIds}`, {
      variant: "success",
    });
  };

  const AddNewItem = () => {
    setAddItemPopup(true);
  };

  const handleClose = () => {
    setRemovingItemPopup(false);
    setAddItemPopup(false);
  };

  const openConfirmWindow = (id) => {
    setRemovingItemPopup(true);
    setSelectedId(id);
  };

  return (
    <>
      <Box
        backgroundColor={theme.palette.background.default}
        sx={{ height: "100vh" }}
      >
        <Container>
          <TableGenerator
            fetcheddata={fetcheddata}
            columnName={columnName}
            handleCheckboxClick={handleCheckboxClick}
            rowClickHandle={rowClickHandle}
            openConfirmWindow={openConfirmWindow}
            newData={newData}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex" }}>
              <SearchField search={search} setSearch={setSearch} />
              <Button
                variant="contained"
                onClick={removeSelectedRows}
                color="secondary"
                sx={{ m: 2, alignItems: "center" }}
              >
                Delete Selected Items
              </Button>
              <Button
                variant="contained"
                onClick={AddNewItem}
                color="secondary"
                sx={{ m: 2, alignItems: "center" }}
              >
                Add New Item
              </Button>
            </Box>
            {count && (
              <TablePagination
                component="div"
                count={count}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Box>
        </Container>
      </Box>
      <Dialog
        open={RemovingItemPopup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure that you want to remove that item?"}
        </DialogTitle>
        <DialogActions>
          <Button color="secondary" variant="contained" onClick={handleClose}>
            Disagree
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => handleClearClick(selectedId)}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <AddItemDialog
        columnName={columnName}
        open={AddItemPopup}
        handleClose={handleClose}
        setNewData={setNewData}
        newData={newData}
        endpointName={endpointName}
        count={count}
      />
    </>
  );
}

export default EndpointPage;
