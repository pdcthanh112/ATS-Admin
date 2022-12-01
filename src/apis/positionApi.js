import axiosConfig from "../configs/axiosConfig";

const positionApi = {
    create(data) {
        const url = `/position/create`;

        return axiosConfig
            .post(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                throw error.response.data.errorCode;
            });
    },
    async getAllPosition(filter) {
        const { page = 0, size = 5, name = "" } = filter || {};
        const query = new URLSearchParams({
            pageNo: page.toString(),
            pageSize: size.toString(),
            name: name.toString(),
        });
        const url = "/position/getAll";
        const data = await axiosConfig.get(url, { params: query });
        return data.data;
    },

    async getPositionIdAndName(departmentName) {
        const url = `/position/getIdName?departmentName=${departmentName}`;
        const data = await axiosConfig.get(url);
        return data.data;
    },
    async getPositionById(id) {
        const url = `/position/getById/{id}?id=${id}`;
        const data = await axiosConfig.get(url);
        return data.data;
    },
    update(data) {
        const url = `/position/edit/{id}?id=${data.id}`;
        return axiosConfig.put(url, data);
    },
    disable(id) {
        const url = `/position/delete/{id}?id=${id}`;
        return axiosConfig.delete(url);
    },

};
export default positionApi;
