import axiosConfig from "../configs/axiosConfig";

const departmentApi = {
    create(data) {
        const url = `/department/create`;

        return axiosConfig
            .post(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                throw error.response.data.errorCode;
            });
    },
    async getAllDepartment(filter) {
        const { page = 0, size = 5, name = "" } = filter || {};
        const query = new URLSearchParams({
            pageNo: page.toString(),
            pageSize: size.toString(),
            name: name.toString(),
        });
        const url = "/department/getAll";
        const data = await axiosConfig.get(url, { params: query });
        return data.data;
    },
    async getDepartmentName() {
        const url = "/department/getIdName";
        const data = await axiosConfig.get(url);
        return data.data;
    },
    async getDepartmentById(id) {
        const url = `/department/getById/{id}?id=${id}`;
        const data = await axiosConfig.get(url);
        return data.data;
    },
    update(data) {
        const url = `/department/edit/{id}?id=${data.id}`;
        return axiosConfig.put(url, data);
    },
    disable(id) {
        const url = `/department/delete/{id}?id=${id}`;
        return axiosConfig.delete(url);
    },
    active(id) {
        const url = `/department/active/{id}?id=${id}`;
        return axiosConfig.patch(url);
    },

};
export default departmentApi;
