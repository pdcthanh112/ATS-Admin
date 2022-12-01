import { useMutation, useQueryClient } from "react-query";
import positionApi from "../../../apis/positionApi";

const useUpdatePosition = () => {
    const queryClient = useQueryClient();
    let positionId = "";
    return useMutation(
        "updatePosition",
        async (position) => {
            positionId = position;
            return positionApi.update(position);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("position");
                queryClient.invalidateQueries("departmentName");
                queryClient.invalidateQueries(`position${positionId.id}`);
            },
        }
    );
};

export default useUpdatePosition;
