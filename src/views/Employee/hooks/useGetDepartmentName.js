import { useQuery } from "react-query";
import departmentApi from "../../../apis/departmentApi";

const useGetDepartmentName = () => {
    return useQuery("departmentName", async () => {
        return await departmentApi.getDepartmentName();
    });
};

export default useGetDepartmentName;
