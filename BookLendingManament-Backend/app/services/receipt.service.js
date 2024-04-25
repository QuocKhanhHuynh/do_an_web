const { ObjectId } = require("mongodb");
const ApiResponse = require("../api-response");
const { compare } = require("bcryptjs");

class ReceiptSevice{
    constructor(client){
        this.Receipt = client.db().collection("Receipts");
        this.Book = client.db().collection("Books");
    }

    async create(payload) {
        const dateNow = new Date();
        const start = new Date(Date.parse(payload.startDate));
        const end = new Date(Date.parse(payload.endDate));
        const receipt = {_idClient: payload._idClient, clientUsername: payload.clientUsername, _idEmployee: payload._idEmployee, employeeUsername: payload.employeeUsername,
                        _idBook: payload._idBook, bookName: payload.bookName, registerDate: dateNow, startDate: start, endDate: end, status: 0}
        const result = await this.Receipt.insertOne(receipt);
        if (result.insertedCount != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to insert receipt");
        }
    }
    async update(id, payload) {
        const receipt = {_idClient: payload._idClient, clientUsername: payload.clientUsername, _idEmployee: payload._idEmployee, employeeUsername: payload.employeeUsername,
            _idBook: payload._idBook, bookName: payload.bookName, registerDate: payload.registerDate, startDate: payload.startDate, endDate: payload.endDate, status: payload.status}
        const result = await this.Receipt.updateOne({_id: ObjectId.isValid(id)? new ObjectId(id): null},{$set: receipt});
        if (result.matchedCount  != 0) {
            if (payload.status == 1){
                const book = await this.Book.findOne({_id: ObjectId.isValid(payload._idBook)? new ObjectId(payload._idBook): null});
                const quanlityUpdate = parseInt(book.stock) - 1;
                book.stock = quanlityUpdate;
                await this.Book.updateOne({_id: ObjectId.isValid(payload._idBook)? new ObjectId(payload._idBook): null},{$set: book});
            }
            if (payload.status == 2){
                const book = await this.Book.findOne({_id: ObjectId.isValid(payload._idBook)? new ObjectId(payload._idBook): null});
                const quanlityUpdate = parseInt(book.stock) + 1;
                book.stock = quanlityUpdate;
                await this.Book.updateOne({_id: ObjectId.isValid(payload._idBook)? new ObjectId(payload._idBook): null},{$set: book});
            }
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to update receipt");
        }
    }
        
    async find(){
        const result = await this.Receipt.find({});
        const obj =  await result.toArray();
        return new ApiResponse(true,obj,null);
    }
    async findById(id){
        const result = await this.Receipt.findOne({_id: ObjectId.isValid(id)? new ObjectId(id): null});
        if (result != null) {
            return new ApiResponse(true, result, null);
        } else {
            return new ApiResponse(false,null,"Failed to find receipt");
        }
    }
    async findByClientId(id){
        console.log(id);
        const result = await this.Receipt.find({_idClient: id});
        if (result != null) {
            return new ApiResponse(true, result, null);
        } else {
            return new ApiResponse(false,null,"Failed to find receipt");
        }
    }
    async deleteById(id){
        const result = await this.Receipt.deleteOne({_id: ObjectId.isValid(id)? new ObjectId(id): null});
        if (result.matchedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to delete receipt");
        }
    }
    async delete(){
        const result = await this.receipt.deleteMany({});
        if (result.deletedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to delete all receipt");
        }
    }
}

module.exports = ReceiptSevice;