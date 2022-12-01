import { useMutation, useQueryClient } from "react-query";
import employeeApi from "../../../apis/employeeApi";

const useUpdateAccount = () => {
    const queryClient = useQueryClient();
    let id = ""
    return useMutation(
        "updateAccount",
        async (account) => {
            id = account.id;
            return employeeApi.update(account);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("accountsEmp");
                queryClient.invalidateQueries(`emp${id}`);
            },
        }
    );
};

export default useUpdateAccount;
