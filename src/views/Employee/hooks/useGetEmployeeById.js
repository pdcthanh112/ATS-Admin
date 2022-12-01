import { useQuery } from "react-query";
import employeeApi from "../../../apis/employeeApi";
const useGetEmployeeById = (id) => {
    return useQuery(`emp${id}`, async () => {
        return employeeApi.getEmployeeById(id);
    });
};

export default useGetEmployeeById;
