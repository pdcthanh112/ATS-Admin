import { useMutation, useQueryClient } from "react-query";
import employeeApi from "../../../apis/employeeApi";

const useActive = () => {
    const queryClient = useQueryClient();
    return useMutation(
        "activeAccount",
        async (id) => {
            return employeeApi.active(id);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("accountsEmp");
            },
        }
    );
};

export default useActive;
