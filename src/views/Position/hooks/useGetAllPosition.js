import { useQuery } from "react-query";
import positionApi from "../../../apis/positionApi";
const useGetAllPosition = (filter) => {
    return useQuery([`position`, filter], async () => {
        return positionApi.getAllPosition(filter);
    });
};

export default useGetAllPosition;