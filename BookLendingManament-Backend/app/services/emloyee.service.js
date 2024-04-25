const { ObjectId } = require("mongodb");
const ApiResponse = require("../api-response");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

class EmloyeeSevice{
    constructor(client){
        this.Emloyee = client.db().collection("Emloyees");
    }

    async login(payload){
        console.log(payload);
        const account = await this.Emloyee.findOne({username: payload.username});
        if (account === null){
            return new ApiResponse(false,null,"Cannot finding emloyee with username " + payload.username);
        }
        if (!(await bcrypt.compare(payload.password, account.password))){
            return new ApiResponse(false,null,"Incorrect password ");
        }
        const token = jwt.sign({_id:account._id}, "secret");
        return new ApiResponse(true, token, null);
    }
    async create(payload){
        const account = await this.Emloyee.findOne({username: payload.username});
        if (account != null){
            return new ApiResponse(false,null,"Username already!");
        }
        const account1 = await this.Emloyee.findOne({phoneNumber: payload.phoneNumber});
        if (account1 != null){
            return new ApiResponse(false,null,"phoneNumber already!");
        }
        if (payload.password == undefined || payload.password == ""){
            return new ApiResponse(false,null,"Password cannot empty!");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload.password, salt);
        const emloyee = {username: payload.username, password: hashedPassword, fullname: payload.fullname, phoneNumber: payload.phoneNumber, address: payload.address, position: payload.position, status: true};
        const result = await this.Emloyee.insertOne(emloyee);
        if (result.insertedCount != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to insert emloyee");
        }
    }

    async update(id, payload) {
        const emloyee = {fullname: payload.fullname, phoneNumber: payload.phoneNumber, address: payload.address, position: payload.position, status: true};
        const result = await this.Emloyee.updateOne({_id: ObjectId.isValid(id)? new ObjectId(id): null},{$set: emloyee});
        if (result.matchedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to update employee");
        }
    }
    async updatePassword(id, payload) {
        console.log(id);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload.password, salt);
        const emloyee = {password: hashedPassword};
        const result = await this.Emloyee.updateOne({_id: ObjectId.isValid(id)? new ObjectId(id): null},{$set: emloyee});
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
        const account = await this.Emloyee.findOne({username: payload.username, phoneNumber: payload.phoneNumber});
        if (account == null){
            return new ApiResponse(false,null,"username or phone number not correct");
        }
        const result = await this.Emloyee.updateOne({username: payload.username, phoneNumber: payload.phoneNumber},{$set: {password: newPass}});
        if (result.matchedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to update password");
        }
    }
        
    async find(){
        const result = await this.Emloyee.find({});
        const obj =  await result.toArray();
        const kq = [];
        for (let i = 0; i < obj.length; i++) {
            let _id = obj[i]._id;
            let username = obj[i].username;
            let fullname = obj[i].fullname;
            let phoneNumber = obj[i].phoneNumber;
            let address = obj[i].address;
            let position = obj[i].position;
            let status = obj[i].status;
            kq.push({_id, username, fullname, phoneNumber, address, position, status});
        }
        return new ApiResponse(true,kq,null);
    }
    async findById(id){
        const result = await this.Emloyee.findOne({_id: ObjectId.isValid(id)? new ObjectId(id): null});
        if (result != null) {
            return new ApiResponse(true, result, null);
        } else {
            return new ApiResponse(false,null,"Failed to find emloyee");
        }
    }
    async findByCookie(id){
        const result = await this.Emloyee.findOne({_id: ObjectId.isValid(id)? new ObjectId(id): null});
        if (result != null) {
            return new ApiResponse(true, result, null);
        } else {
            return new ApiResponse(false,null,"Failed to find emloyee");
        }
    }
}

module.exports = EmloyeeSevice;