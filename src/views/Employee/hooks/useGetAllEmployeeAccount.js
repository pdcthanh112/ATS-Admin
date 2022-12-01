import { useQuery } from "react-query";
import accountApi from "../../../apis/accountApi";
const useGetAllEmployeeAccounts = (filter) => {
  return useQuery(["accountsEmp", filter], async () => {
    return await accountApi.getAllEmployeeAccounts(filter);
  });
};

export default useGetAllEmployeeAccounts;
