import { useMutation, useQueryClient } from "react-query";
import positionApi from "../../../apis/positionApi";

const useActivePosition = () => {
    const queryClient = useQueryClient();
    return useMutation(
        "activePosition",
        async (id) => {
            return positionApi.active(id);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("position");
            },
        }
    );
};

export default useActivePosition;
