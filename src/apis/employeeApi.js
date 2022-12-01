import axiosConfig from "../configs/axiosConfig";

const employeeApi = {
  async getEmployeeById(id) {
    const url = `/employee/getById/{id}?id=${id}`;
    const response = await axiosConfig.get(url);
    return response.data;
  },
  update(data) {
    const url = `/employee/update/{id}?id=${data.id}`;
    return axiosConfig.put(url, data);
  },
  disable(id) {
    const url = `/employee/disable/{id}?id=${id}`;
    return axiosConfig.put(url);
  },
};
export default employeeApi;
