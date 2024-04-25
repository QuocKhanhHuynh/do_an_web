const { ObjectId } = require("mongodb");
const ApiResponse = require("../api-response");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

class ClientSevice{
    constructor(client){
        this.Client = client.db().collection("Clients");
    }

    async login(payload){
        
        const account = await this.Client.findOne({username: payload.username});
        if (account === null){
            return new ApiResponse(false,null,"Cannot finding client with username " + payload.username);
        }
        if (account.status == false){
            return new ApiResponse(false,false,"Account has locked");
        }
        if (!(await bcrypt.compare(payload.password, account.password))){
            return new ApiResponse(false,null,"Incorrect password ");
        }
        const token = jwt.sign({_id:account._id}, "secret");
        return new ApiResponse(true, token, null);
    }

    async create(payload){
        const account = await this.Client.findOne({username: payload.username});
        if (account != null){
            return new ApiResponse(false,null,"Username already!");
        }
        if (payload.password == undefined || payload.password == ""){
            return new ApiResponse(false,null,"Password cannot empty!");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload.password, salt);
        const client = {username: payload.username, password: hashedPassword, fullname: payload.fullname, gender: payload.gender, dOB: payload.dOB, phoneNumber: payload.phoneNumber, address: payload.address, status: true};
        const result = await this.Client.insertOne(client);
        if (result.insertedCount != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to insert client");
        }
    }

    async update(id, payload) {
        const client = {fullname: payload.fullname, gender: payload.gender, dOB: payload.dOB, phoneNumber: payload.phoneNumber, address: payload.address, status: payload.status};
        const result = await this.Client.updateOne({_id: ObjectId.isValid(id)? new ObjectId(id): null},{$set: client});
        if (result.matchedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to update client");
        }
    }
    async updatePassword(id, payload) {
        console.log(id);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload.password, salt);
        const emloyee = {password: hashedPassword};
        const result = await this.Client.updateOne({_id: ObjectId.isValid(id)? new ObjectId(id): null},{$set: emloyee});
        if (result.matchedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to update password");
        }
    }

    async forgetPassword(payload) {
        const salt = await bcrypt.genSalt(10);
        console.log(payload);
        const newPass = await bcrypt.hash(payload.newPass, salt);
        const account = await this.Client.findOne({username: payload.username, phoneNumber: payload.phoneNumber});
        if (account == null){
            return new ApiResponse(false,null,"username or phone number not correct");
        }
        const result = await this.Client.updateOne({username: payload.username, phoneNumber: payload.phoneNumber},{$set: {password: newPass}});
        if (result.matchedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to update password");
        }
    }
        
    async find(){
        const result = await this.Client.find({});
        const obj =  await result.toArray();
        const kq = [];
        for (let i = 0; i < obj.length; i++) {
            let _id = obj[i]._id;
            let username = obj[i].username;
            let fullname = obj[i].fullname;
            let phoneNumber = obj[i].phoneNumber;
            let gender = obj[i].gender;
            let dOB = obj[i].dOB;
            let address = obj[i].address;
            let status = obj[i].status;
            kq.push({_id, username, fullname, phoneNumber, gender, dOB, address, status});
        }
        return new ApiResponse(true,kq,null);
    }
    async findById(id){
        const result = await this.Client.findOne({_id: ObjectId.isValid(id)? new ObjectId(id): null});
        if (result != null) {
            return new ApiResponse(true, result, null);
        } else {
            return new ApiResponse(false,null,"Failed to find client");
        }
    }
    async findByCookie(id){
        const result = await this.Client.findOne({_id: ObjectId.isValid(id)? new ObjectId(id): null});
        if (result != null) {
            return new ApiResponse(true, result, null);
        } else {
            return new ApiResponse(false,null,"Failed to find client");
        }
    }
}

module.exports = ClientSevice;