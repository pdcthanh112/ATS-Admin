import { useQuery } from "react-query";
import employeeApi from "../../../apis/employeeApi";
const useGetByManager = (filter) => {
    return useQuery(["getByManager", filter], async () => {
        return employeeApi.getByManager(filter);
    });
};

export default useGetByManager;