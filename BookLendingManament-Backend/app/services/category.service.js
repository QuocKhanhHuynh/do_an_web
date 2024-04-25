const { ObjectId } = require("mongodb");
const ApiResponse = require("../api-response");

class CategorySevice{
    constructor(client){
        this.Category = client.db().collection("Categories");
    }

    async create(payload) {
        
        const category = {name: payload.name}
        const result = await this.Category.insertOne(category);
        if (result.insertedCount != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to insert category");
        }
    }
    async update(id, payload) {
        const category = {name: payload.name}
        const result = await this.Category.updateOne({_id: ObjectId.isValid(id)? new ObjectId(id): null},{$set: category});
        if (result.matchedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to update category");
        }
    }
        
    async find(){
        const result = await this.Category.find({});
        const obj =  await result.toArray();
        return new ApiResponse(true,obj,null);
    }
    async findById(id){
        const result = await this.Category.findOne({_id: ObjectId.isValid(id)? new ObjectId(id): null});
        if (result != null) {
            return new ApiResponse(true, result, null);
        } else {
            return new ApiResponse(false,null,"Failed to find category");
        }
    }
    async deleteById(id){
        const result = await this.Category.deleteOne({_id: ObjectId.isValid(id)? new ObjectId(id): null});
        if (result.matchedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to delete category");
        }
    }
    async delete(){
        const result = await this.Category.deleteMany({});
        if (result.deletedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to delete all category");
        }
    }
}

module.exports = CategorySevice;