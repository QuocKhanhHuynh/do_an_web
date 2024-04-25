class ApiResponse{
    constructor(status, object=null, messange=null){
        this.status = status;
        this.object = object;
        this.messange = messange;
    }
}
module.exports = ApiResponse;