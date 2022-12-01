import { useMutation, useQueryClient } from "react-query";
import departmentApi from "../../../apis/departmentApi";
const useCreateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation(
        "createDepartment",
        async (department) => {
            return departmentApi.create(department);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries("department");
            },
        }
    );
};

export default useCreateDepartment;
