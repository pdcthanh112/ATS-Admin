import { useQuery } from "react-query";
import departmentApi from "../../../apis/departmentApi";
const useGetAllDepartment = (filter) => {
    return useQuery(["department", filter], async () => {
        return departmentApi.getAllDepartment(filter);
    });
};

export default useGetAllDepartment;