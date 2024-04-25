import createApiClient from "./api.service";
class EmployeeService {
    constructor(baseUrl = "/api/emloyees") {
        this.api = createApiClient(baseUrl);
    }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
    async logout() {
        return (await this.api.post("/logout")).data;
    }
    async getAll() {
        return (await this.api.get("/")).data;;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async getbyCookie() {
        return (await this.api.get(`/cookies`)).data;
    }
    async updatePass(id, data) {
        return (await this.api.put(`/${id}/updatepass`, data)).data;
    }
    async forgetPass(data) {
        return (await this.api.put(`/forgetpass`, data)).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
}
export default new EmployeeService();