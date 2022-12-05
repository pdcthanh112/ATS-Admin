import React, { useEffect } from "react";
import "./Dashboard.scss";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useDispatch, useSelector } from "react-redux";
import useCount from "./hooks/useCount";
import { CircularProgress } from "@mui/material";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  const { data: response, isLoading } = useCount();
  return (
    <React.Fragment>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div className="flex justify-between flex-wrap-reverse mt-10 text-4xl">
            Statistics
          </div>
          <div className="flex justify-between flex-wrap-reverse space-x-8 mt-3">
            <div>
              <Card
                sx={{ minWidth: 370 }}
                className="border-l-4 border-lime-700"
              >
                <CardContent>
                  <Typography sx={{ fontSize: 20 }} color="green" gutterBottom>
                    {response.data.totalEmployee}
                  </Typography>
                  <Typography sx={{ fontSize: 22 }}>EMPLOYEE</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href="http://localhost:3000/#/employee">
                    See all
                  </Button>
                </CardActions>
              </Card>
            </div>
            <div>
              <Card
                sx={{ minWidth: 370 }}
                className="border-l-4 border-lime-700"
              >
                <CardContent>
                  <Typography sx={{ fontSize: 20 }} color="green" gutterBottom>
                    {response.data.totalDepartment}
                  </Typography>
                  <Typography sx={{ fontSize: 22 }}>DEPARTMENT</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    href="http://localhost:3000/#/department"
                  >
                    See all
                  </Button>
                </CardActions>
              </Card>
            </div>
            <div>
              <Card
                sx={{ minWidth: 370 }}
                className="border-l-4 border-lime-700"
              >
                <CardContent>
                  <Typography sx={{ fontSize: 20 }} color="green" gutterBottom>
                    {response.data.totalPosition}
                  </Typography>
                  <Typography sx={{ fontSize: 22 }}>POSITION</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href="http://localhost:3000/#/position">
                    See all
                  </Button>
                </CardActions>
              </Card>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
