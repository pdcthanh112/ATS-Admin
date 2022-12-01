import { useQuery } from "react-query";
import departmentApi from "../../../apis/departmentApi";
const useGetDepartmentById = (id) => {
    return useQuery(`depart${id}`, async () => {
        return departmentApi.getDepartmentById(id);
    });
};

export default useGetDepartmentById;
