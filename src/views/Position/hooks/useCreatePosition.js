import { useMutation, useQueryClient } from "react-query";
import positionApi from "../../../apis/positionApi";
const useCreatePosition = () => {
    const queryClient = useQueryClient();
    return useMutation(
        "createPosition",
        async (position) => {
            return positionApi.create(position);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries("position");
            },
        }
    );
};

export default useCreatePosition;
