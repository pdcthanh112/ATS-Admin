import { useMutation, useQueryClient } from "react-query";
import departmentApi from "../../../apis/departmentApi";

const useUpdateDepartment = () => {
    const queryClient = useQueryClient();
    let departmentId = ""
    return useMutation(
        "updateDepartment",
        async (department) => {
            departmentId = department.id;
            return departmentApi.update(department);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("department");
                queryClient.invalidateQueries(`depart${departmentId}`);
            },
        }
    );
};

export default useUpdateDepartment;
