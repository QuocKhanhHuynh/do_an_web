import createApiClient from "./api.service";
class ClientService {
    constructor(baseUrl = "/api/clients") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async create(data) {
        return (await this.api.post("/",data)).data;
    }
    async login(data) {
        return (await this.api.post("/login",data)).data;
    }
    async logout() {
        return (await this.api.get("/logout")).data;
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
}
export default new ClientService();