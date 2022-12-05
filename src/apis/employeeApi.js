import axiosConfig from "../configs/axiosConfig";

const employeeApi = {
  async getEmployeeById(id) {
    const url = `/employee/getById/{id}?id=${id}`;
    const response = await axiosConfig.get(url);
    return response.data;
  },
  async count() {
    const url = "/employee/countTotal";
    const total = await axiosConfig.get(url);
    return total.data;
  },
  update(data) {
    const url = `/employee/update/{id}?id=${data.id}`;
    return axiosConfig.put(url, data);
  },
  disable(id) {
    const url = `/employee/disable/${id}`;
    return axiosConfig.put(url);
  },
  active(id) {
    const url = `/employee/active/${id}`;
    return axiosConfig.patch(url);
  },
};
export default employeeApi;
