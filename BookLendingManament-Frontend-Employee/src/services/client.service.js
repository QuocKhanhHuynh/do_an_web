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
}
export default new ClientService();