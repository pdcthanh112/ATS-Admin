import {
  Box,
  CircularProgress,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { DialogActions, DialogContentText, DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { useForm } from "react-hook-form";
import PaginationComponent from "../../../component/Pagination";
import CreateAnEmployee from "../EmployeePage/pages/CreateAnEmployee";
import useActive from "../hooks/useActive";
import useDisable from "../hooks/useDisable";
import getAllEmployeeAccounts from "../hooks/useGetAllEmployeeAccount";
import useGetEmployeeById from "../hooks/useGetEmployeeById";
import useUpdateEmployee from "../hooks/useUpdateAccount";
import EditEmployeeForm from "./pages/EditAnEmployee";

// DepartmentPage.propTypes = {};

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
const EmployeePage = () => {
  const form = useForm();
  const { handleSubmit, register } = form;
  const handleOpen = () => {
    setOpen(true);
  };
  const [isEdit, setIsEdit] = useState(false);

  const onNotEdit = () => {
    setIsEdit(false);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenUpdate(false);
    setOpenConfirm(false);
    setOpenActive(false);
  };
  const classes = useStyles();

  const { mutate: updateEmployee } = useUpdateEmployee();
  const { mutate: disableEmployee } = useDisable();
  const { mutate: activeEmployee } = useActive();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openActive, setOpenActive] = useState(false);
  const [filter, setFilter] = useState({
    size: 10,
    page: 0,
    name: "",
  });

  const handleUpdate = (row) => {
    setOpenUpdate(true);
    setId(row.employee.id);
  };
  const handleDisable = (row) => {
    setId(row.employee.id);
    setOpenConfirm(true);
  };
  const handleActive = (row) => {
    setOpenActive(true);
    setId(row.employee.id);
  };
  const disableSubmit = async () => {
    await disableEmployee(id, {
      onSuccess: () => {
        enqueueSnackbar("Disable successfully", { variant: "success" });
        setOpenConfirm(false);
      },
      onError: (error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  };
  const [id, setId] = useState();
  const { data: detail, isLoading: isLoadingDetail } = useGetEmployeeById(id);

  const updateSubmit = async (values) => {
    values = { ...values, id: id };
    await updateEmployee(values, {
      onSuccess: () => {
        enqueueSnackbar("Update successfully", { variant: "success" });
        setOpenUpdate(false);
      },
      onError: (error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  };
  const activeSubmit = async () => {
    await activeEmployee(id, {
      onSuccess: () => {
        enqueueSnackbar("Active successfully", { variant: "success" });
        setOpenActive(false);
      },
      onError: (error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  };

  const { data: response, isLoading } = getAllEmployeeAccounts(filter);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="panel panel-default ">
          <div className="panel-body">
            <div className="table-responsive">
              <div className="flex justify-between flex-wrap-reverse">
                <div className="flex justify-between w-full">
                  <Stack spacing={2} direction="row">
                    <BootstrapButton
                      variant="contained"
                      disableRipple
                      onClick={handleOpen}
                    >
                      <i className="fa fa-plus" /> Create Employee
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
              {isLoading ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <React.Fragment>
                  <TableContainer component={Paper}>
                    <Table sx={{ width: "100%" }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              width: 50,
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
                            Employee name
                          </TableCell>

                          <TableCell
                            sx={{
                              width: 200,
                              color: "text.primary",
                              fontSize: 14,
                              fontWeight: "bold",
                            }}
                          >
                            Email
                          </TableCell>
                          <TableCell
                            sx={{
                              width: 150,
                              color: "text.primary",
                              fontSize: 14,
                              fontWeight: "bold",
                            }}
                          >
                            Position
                          </TableCell>
                          <TableCell
                            sx={{
                              width: 200,
                              color: "text.primary",
                              fontSize: 14,
                              fontWeight: "bold",
                            }}
                          >
                            Department
                          </TableCell>

                          <TableCell
                            sx={{
                              width: 100,
                              color: "text.primary",
                              fontSize: 14,
                              fontWeight: "bold",
                            }}
                          >
                            Phone
                          </TableCell>
                          <TableCell
                            sx={{
                              width: 100,
                              color: "text.primary",
                              fontSize: 14,
                              fontWeight: "bold",
                            }}
                          >
                            Status
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
                              <EditEmployeeForm
                                key="updateForm"
                                onSubmit={updateSubmit}
                                editEmployee={detail?.data}
                                onNotEdit={onNotEdit}
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
                                onClick={() =>
                                  console.log(
                                    "Hii click hahaha",
                                    row.employee.id
                                  )
                                }
                                key={row.employee.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell sx={{ fontSize: 12 }} align="left">
                                  {row.employee.id}
                                </TableCell>
                                <TableCell sx={{ fontSize: 12 }} align="left">
                                  {row.employee.name}
                                </TableCell>

                                <TableCell sx={{ fontSize: 12 }} align="left">
                                  {row.email}
                                </TableCell>
                                <TableCell sx={{ fontSize: 12 }} align="left">
                                  {row.employee.position.name}
                                </TableCell>
                                <TableCell sx={{ fontSize: 12 }} align="left">
                                  {row.employee.department.name}
                                </TableCell>

                                <TableCell sx={{ fontSize: 12 }} align="left">
                                  {row.employee.phone}
                                </TableCell>
                                <TableCell sx={{ fontSize: 12 }} align="left">
                                  {row.employee.status === "ACTIVATE" ? (
                                    <Badge bg="info">
                                      {row.employee.status}
                                    </Badge>
                                  ) : (
                                    <Badge bg="danger">
                                      {row.employee.status}
                                    </Badge>
                                  )}
                                </TableCell>

                                <TableCell sx={{ fontSize: 12 }} align="left">
                                  {row.employee.status === "ACTIVATE" ? (
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
                            open={openConfirm}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Disable an employee"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Do you really want to disable this employee
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
                              {"Active an employee"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Do you really want to active this employee
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
                            fullWidth={true}
                            open={open}
                            maxWidth="md"
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title"
                          >
                            <IconButton
                              className={classes.closeButton}
                              onClick={handleClose}
                            >
                              <Close />
                            </IconButton>

                            <DialogContent>
                              <>
                                <CreateAnEmployee closeDialog={handleClose} />
                              </>
                            </DialogContent>
                          </Dialog>
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                </React.Fragment>
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

export default EmployeePage;
