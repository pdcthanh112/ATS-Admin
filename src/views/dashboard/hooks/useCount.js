import { useQuery } from "react-query";
import employeeApi from "../../../apis/employeeApi";
const useCountEmployee = () => {
    return useQuery("count", async () => {
        return employeeApi.count();
    });
};

export default useCountEmployee;
