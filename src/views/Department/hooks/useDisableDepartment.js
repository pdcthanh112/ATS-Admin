import { useMutation, useQueryClient } from "react-query";
import departmentApi from "../../../apis/departmentApi";

const useDisableDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation(
        "disableDepartment",
        async (id) => {
            return departmentApi.disable(id);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("department");
            },
        }
    );
};

export default useDisableDepartment;
