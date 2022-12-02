import { useMutation, useQueryClient } from "react-query";
import departmentApi from "../../../apis/departmentApi";

const useActiveDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation(
        "activeDepartment",
        async (id) => {
            return departmentApi.active(id);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("department");
            },
        }
    );
};

export default useActiveDepartment;
