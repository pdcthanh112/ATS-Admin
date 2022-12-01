import { useQuery } from "react-query";
import roleApi from "../../../apis/roleApi";

const useGetRoles = () => {
    return useQuery("roles", async () => {
        return await roleApi.getAllRoles();
    });
};

export default useGetRoles;
