import axiosConfig from "../configs/axiosConfig";

const roleApi = {
    createRole(data) {
        const url = `/role/create`;

        return axiosConfig
            .post(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                throw error.response.data.errorCode;
            });
    },
    async getAllRoles() {
        const url = "/role/getAll";
        const data = await axiosConfig.get(url);
        return data.data;
    },
    //   update(data) {
    //     const url = `/seller/updateSeller/${data.id}`;
    //     return axiosClient.put(url, data);
    //   },

};
export default roleApi;
