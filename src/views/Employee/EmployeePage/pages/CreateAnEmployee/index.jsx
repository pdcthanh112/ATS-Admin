import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import CreateAccountForm from "../../../components/CreateAccountForm";
import useCreateAccount from "../../../hooks/useCreateAccount";

CreateAnEmployee.propTypes = {};

function CreateAnEmployee(props) {
  const { mutate: createAccount } = useCreateAccount();
  const { closeDialog } = props;
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    await createAccount(values, {
      onSuccess: () => {
        enqueueSnackbar("Create Employee successfully", { variant: "success" });
        closeDialog();
      },
      onError: (error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      },
    });
  };

  return (
    <>
      <Typography color="green" variant="h4" className="mt-4">
        Create An Employee
      </Typography>
      <CreateAccountForm onSubmit={handleSubmit} />
    </>
  );
}

export default CreateAnEmployee;
