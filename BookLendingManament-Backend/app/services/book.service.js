const { ObjectId } = require("mongodb");
const ApiResponse = require("../api-response");

class BookSevice{
    constructor(client){
        this.Book = client.db().collection("Books");
    }

    async create(payload) {
        
        const book = {name: payload.name, price: payload.price, quanlity: payload.quanlity, publicationYear: payload.publicationYear, _idPublisher: payload._idPublisher, publisherName: payload.publisherName,
            _idCategory: payload._idCategory, categoryName: payload.categoryName, description: payload.description, stock: payload.stock, urlImage: payload.urlImage};
        const result = await this.Book.insertOne(book);
        if (result.insertedCount != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to insert book");
        }
    }
    async update(id, payload) {
        const book = {name: payload.name, price: payload.price, quanlity: payload.quanlity, publicationYear: payload.publicationYear, _idPublisher: payload._idPublisher, publisherName: payload.publisherName,
            _idCategory: payload._idCategory, categoryName: payload.categoryName, description: payload.description, stock: payload.stock, urlImage: payload.urlImage};
        const result = await this.Book.updateOne({_id: ObjectId.isValid(id)? new ObjectId(id): null},{$set: book});
        if (result.matchedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to update book");
        }
    }
        
    async find(){
        const result = await this.Book.find({});
        const obj =  await result.toArray();
        return new ApiResponse(true,obj,null);
    }
    async findById(id){
        console.log("1 " + id);
        const result = await this.Book.findOne({_id: ObjectId.isValid(id)? new ObjectId(id): null});
        console.log("2 " + result._id + result.name);
        if (result != null) {
            return new ApiResponse(true, result, null);
        } else {
            return new ApiResponse(false,null,"Failed to find book");
        }
    }
    async deleteById(id){
        const result = await this.Book.deleteOne({_id: ObjectId.isValid(id)? new ObjectId(id): null});
        if (result.matchedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to delete book");
        }
    }
    async delete(){
        const result = await this.Book.deleteMany({});
        if (result.deletedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to delete all book");
        }
    }
}

module.exports = BookSevice;