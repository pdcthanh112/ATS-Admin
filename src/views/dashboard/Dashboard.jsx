import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useCount from "./hooks/useCount";
import { CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";
import useGetByManager from "./hooks/useGetByManager";
import useGetByDirector from "./hooks/useGetByDirector";
import PaginationComponent from "../../component/Pagination";

const Dashboard = () => {
  const [filterManager, setFilterManager] = useState({
    size: 3,
    page: 0,
  });
  const [filterDirector, setFilterDirector] = useState({
    size: 3,
    page: 0,
  });
  const { data: responseManager, isLoading: loadingManager } =
    useGetByManager(filterManager);
  const { data: responseDirector, isLoading: loadingDirector } =
    useGetByDirector(filterDirector);
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
                  <NavLink
                    to="/employee"
                    className={({ isActive }) =>
                      isActive ? "when-active" : "navigation-item"
                    }
                  >
                    <Button size="small">See all</Button>
                  </NavLink>
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
                  <NavLink
                    to="/department"
                    className={({ isActive }) =>
                      isActive ? "when-active" : "navigation-item"
                    }
                  >
                    <Button size="small">See all</Button>
                  </NavLink>
                </CardActions>
              </Card>
            </div>
            <div>
              <Card
                sx={{ minWidth: 370 }}
                className="border-l-4 border-lime-800"
              >
                <CardContent>
                  <Typography sx={{ fontSize: 20 }} color="green" gutterBottom>
                    {response.data.totalPosition}
                  </Typography>
                  <Typography sx={{ fontSize: 22 }}>POSITION</Typography>
                </CardContent>
                <CardActions>
                  <NavLink
                    to="/position"
                    className={({ isActive }) =>
                      isActive ? "when-active" : "navigation-item"
                    }
                  >
                    <Button size="small">See all</Button>
                  </NavLink>
                </CardActions>
              </Card>
            </div>
          </div>
          <div className="flex justify-between flex-col mt-3">
            <div className="flex flex-row justify-between">
              <div className="text-2xl pl-4 py-2 rounded-md text-cyan-50 bg-lime-900 w-[42%]">
                Manager
              </div>
              <div className="text-2xl pl-4 py-2 rounded-md text-cyan-50 bg-lime-900 w-[37%]">
                Director
              </div>
            </div>
            <div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col space-y-3 mt-2">
                  {loadingManager ? (
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    responseManager.data.responseList?.map((data) => {
                      return (
                        <div>
                          <Card>
                            <CardContent className="flex justify-between">
                              <Typography
                                className="w-96"
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {data.name}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                className="pl-1"
                              >
                                {data.code}
                              </Typography>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })
                  )}
                  <PaginationComponent
                    filter={filterManager}
                    setFilter={setFilterManager}
                    total={responseManager?.data.totalPage}
                  />
                </div>
                <div className="flex flex-col space-y-3 mt-2">
                  {loadingDirector ? (
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    responseDirector.data.responseList?.map((data) => {
                      return (
                        <div>
                          <Card>
                            <CardContent className="flex justify-between">
                              <Typography
                                className="w-80"
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {data.name}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                className="pr-2"
                              >
                                {data.code}
                              </Typography>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })
                  )}
                  <PaginationComponent
                    filter={filterDirector}
                    setFilter={setFilterDirector}
                    total={responseDirector?.data.totalPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
