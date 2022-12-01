import { useQuery } from "react-query";
import positionApi from "../../../apis/positionApi";
const useGetPositionById = (id) => {
    return useQuery(`position${id}`, async () => {
        return positionApi.getPositionById(id);
    });
};

export default useGetPositionById;
