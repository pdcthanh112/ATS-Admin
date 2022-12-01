import { useMutation, useQueryClient } from "react-query";
import positionApi from "../../../apis/positionApi";

const useDisablePosition = () => {
    const queryClient = useQueryClient();
    return useMutation(
        "disablePosition",
        async (id) => {
            return positionApi.disable(id);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("position");
            },
        }
    );
};

export default useDisablePosition;
