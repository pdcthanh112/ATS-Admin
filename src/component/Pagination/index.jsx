import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  palette: {
    primary: {
      main: "black",
    },
  },
}));
function PaginationComponent({ total = 1, setFilter, filter }) {
  const handleOnchange = (e, page) => {
    setFilter({ ...filter, page: page - 1 });
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Stack>
        <Pagination
          sx={{ pointerEvents: "" }}
          style={{ float: "right" }}
          shape="rounded"
          count={total}
          color="primary"
          onChange={handleOnchange}
        />
      </Stack>
    </div>
  );
}

export default PaginationComponent;
