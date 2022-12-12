import { useQuery } from "react-query";
import employeeApi from "../../../apis/employeeApi";
const useGetByDirector = (filter) => {
    return useQuery(["getByDirector", filter], async () => {
        return employeeApi.getByDirector(filter);
    });
};

export default useGetByDirector;