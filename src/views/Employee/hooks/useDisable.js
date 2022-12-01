import { useMutation, useQueryClient } from "react-query";
import employeeApi from "../../../apis/employeeApi";

const useDisable = () => {
    const queryClient = useQueryClient();
    return useMutation(
        "disableAccount",
        async (id) => {
            return employeeApi.disable(id);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("accountsEmp");
            },
        }
    );
};

export default useDisable;
