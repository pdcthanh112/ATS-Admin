import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { DialogActions, DialogContentText, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PaginationComponent from "../../../component/Pagination";
import useDisablePosition from "../hooks/useDisablePosition";
import useGetAllPosition from "../hooks/useGetAllPosition";
import useGetPositionById from "../hooks/useGetPositionById";
import useUpdatePosition from "../hooks/useUpdatePosision";
import CreateAPosition from "./pages/CreateAPosition";
import EditPositionForm from "./pages/EditAPosition";
import { styled } from "@mui/material/styles";
import Badge from "react-bootstrap/Badge";
import useActivePosition from "../hooks/useActivePosition";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
  },

  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));
const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#20D489",
  borderColor: "#20D489",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#34ad73",
    borderColor: "#34ad73",
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});
const PositionPage = () => {
  const form = useForm();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenUpdate(false);
    setOpenDisable(false);
  };
  const classes = useStyles();
  const [filter, setFilter] = useState({
    size: 10,
    page: 0,
    name: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDisable, setOpenDisable] = useState(false);
  const [openActive, setOpenActive] = useState(false);
  const { mutate: update } = useUpdatePosition();
  const { mutate: disable } = useDisablePosition();
  const { mutate: active } = useActivePosition();

  const handleUpdate = (row) => {
    setOpenUpdate(true);
    setId(row.id);
  };
  const handleDisable = (row) => {
    setOpenDisable(true);
    setId(row.id);
  };
  const handleActive = (row) => {
    setOpenActive(true);
    setId(row.id);
  };
  const [id, setId] = useState();
  const { data: detail, isLoading: isLoadingDetail } = useGetPositionById(id);
  const updateSubmit = async (values) => {
    values = { ...values, id: id };
    await update(values, {
      onSuccess: () => {
        enqueueSnackbar("Update successfully", { variant: "success" });
        setOpenUpdate(false);
      },
      onError: (error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      },
    });
  };
  const disableSubmit = async () => {
    await disable(id, {
      onSuccess: () => {
        enqueueSnackbar("Disable successfully", { variant: "success" });
        setOpenDisable(false);
      },
      onError: (error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      },
    });
  };
  const activeSubmit = async () => {
    await active(id, {
      onSuccess: () => {
        enqueueSnackbar("Active successfully", { variant: "success" });
        setOpenActive(false);
      },
      onError: (error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      },
    });
  };
  const { data: response, isLoading } = useGetAllPosition(filter);
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="panel panel-default ">
          <div className="panel-body">
            <div className="table-responsive">
              <div className="flex justify-between flex-wrap-reverse">
                <div className="flex justify-between w-full mt-4">
                  <Stack spacing={2} direction="row">
                    <BootstrapButton
                      variant="contained"
                      disableRipple
                      onClick={handleOpen}
                    >
                      <i className="fa fa-plus" /> Create Position
                    </BootstrapButton>
                  </Stack>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFilter({ ...filter, name: e.target[0].value });
                    }}
                    style={{ maxWidth: "800px" }}
                  >
                    <div className="mb-0">
                      <input
                        type="text"
                        id="help"
                        name="name"
                        className="bg-white rounded shadow border-2 py-1"
                        placeholder=" Search by name"
                      />
                      <Button variant="contained" type="submit">
                        Search
                      </Button>
                    </div>
                  </form>
                </div>

                <div className=" flex flex-wrap">
                  <form className="shrink-0">
                    <div className="dataTables_filter"></div>
                  </form>
                </div>
              </div>
              <div className="flex justify-between flex-wrap-reverse"></div>
              {isLoading || !response.data.responseList ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer component={Paper}>
                  <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            width: 150,
                            color: "text.primary",
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          Id
                        </TableCell>
                        <TableCell
                          sx={{
                            width: 200,
                            color: "text.primary",
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          Position Name
                        </TableCell>
                        <TableCell
                          sx={{
                            width: 460,
                            color: "text.primary",
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          Department Name
                        </TableCell>

                        <TableCell
                          sx={{
                            width: 160,
                            color: "text.primary",
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          Status
                        </TableCell>
                        <TableCell
                          sx={{
                            width: 160,
                            color: "text.primary",
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          Total Employee
                        </TableCell>
                        <TableCell
                          sx={{
                            width: 250,
                            color: "text.primary",
                            fontSize: 14,
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <Dialog
                      disableBackdropClick
                      disableEscapeKeyDown
                      open={openUpdate}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <IconButton
                        className={classes.closeButton}
                        onClick={handleClose}
                      >
                        <Close />
                      </IconButton>
                      <DialogContent sx={{ width: "600px" }}>
                        <>
                          {isLoadingDetail ? (
                            <Box sx={{ display: "flex" }}>
                              <CircularProgress />
                            </Box>
                          ) : (
                            <EditPositionForm
                              key="updateForm"
                              onSubmit={updateSubmit}
                              editPosition={detail?.data}
                              onNotEdit={handleClose}
                            />
                          )}
                        </>
                      </DialogContent>
                    </Dialog>
                    {response.data && (
                      <TableBody>
                        {response.data.responseList.map((row) => {
                          return (
                            <TableRow
                              key={row.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell sx={{ fontSize: 12 }} align="left">
                                {row.id}
                              </TableCell>
                              <TableCell sx={{ fontSize: 12 }} align="left">
                                {row.name}
                              </TableCell>
                              <TableCell sx={{ fontSize: 12 }} align="left">
                                {row.department.name}
                              </TableCell>

                              <TableCell sx={{ fontSize: 12 }} align="left">
                                {row.status === "ACTIVATE" ? (
                                  <Badge bg="info">{row.status}</Badge>
                                ) : (
                                  <Badge bg="danger">{row.status}</Badge>
                                )}
                              </TableCell>
                              <TableCell sx={{ fontSize: 12 }} align="left">
                                {row.numberUsePosition}
                              </TableCell>

                              <TableCell sx={{ fontSize: 12 }} align="left">
                                {row.status === "ACTIVATE" ? (
                                  <>
                                    <button
                                      onClick={() => {
                                        handleUpdate(row);
                                      }}
                                      className="btn btn-primary w-20 ml-5"
                                    >
                                      {" "}
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleDisable(row);
                                      }}
                                      className="btn btn-danger w-20 ml-2"
                                    >
                                      {" "}
                                      Disable
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() => {
                                      handleActive(row);
                                    }}
                                    className="btn btn-warning w-40 ml-5"
                                  >
                                    {" "}
                                    Active
                                  </button>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        <Dialog
                          open={openDisable}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Disable a position"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Do you really want to disable this position
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={disableSubmit} autoFocus>
                              Agree
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <Dialog
                          open={openActive}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Active a position"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Do you really want to active this position
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={activeSubmit} autoFocus>
                              Agree
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <Dialog
                          disableBackdropClick
                          disableEscapeKeyDown
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="form-dialog-title"
                        >
                          <IconButton
                            className={classes.closeButton}
                            onClick={handleClose}
                          >
                            <Close />
                          </IconButton>

                          <DialogContent sx={{ width: "600px" }}>
                            <>
                              <CreateAPosition closeDialog={handleClose} />
                            </>
                          </DialogContent>
                        </Dialog>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              )}
              <PaginationComponent
                filter={filter}
                setFilter={setFilter}
                total={response?.data.totalPage}
              />
            </div>
          </div>
        </div>
        {/*End Advanced Tables */}
      </div>
    </div>
  );
};

export default PositionPage;
