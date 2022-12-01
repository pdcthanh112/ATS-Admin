import axiosConfig from "../configs/axiosConfig";

const accountApi = {
    register(data) {
        const url = `/auth/registerByAdmin`;

        return axiosConfig
            .post(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                throw error.response.data.errorCode;
            });
    },
    async getAllEmployeeAccounts(filter) {
        const { page = 0, size = 5, name = "" } = filter || {};
        const query = new URLSearchParams({
            pageNo: page.toString(),
            pageSize: size.toString(),
            name: name,
        });
        const url = "/account/getEmployeeAccounts";
        const data = await axiosConfig.get(url, { params: query });
        return data.data;
    },

};
export default accountApi;
