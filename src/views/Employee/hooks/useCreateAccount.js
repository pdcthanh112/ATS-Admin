import { useMutation, useQueryClient } from "react-query";
import accountApi from "../../../apis/accountApi";
const useCreateAccount = () => {
    const queryClient = useQueryClient();
    return useMutation(
        "createAccount",
        async (account) => {
            return accountApi.register(account);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries("accountsEmp");
            },
        }
    );
};

export default useCreateAccount;
