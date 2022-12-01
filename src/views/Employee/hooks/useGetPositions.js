import { useQuery } from "react-query";
import positionApi from "../../../apis/positionApi";

const useGetPositions = (departmentName) => {
    return useQuery(["positionName", departmentName], async () => {
        console.log("Check call api", departmentName)
        return await positionApi.getPositionIdAndName(departmentName);
    });
};

export default useGetPositions;
