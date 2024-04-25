const { ObjectId } = require("mongodb");
const ApiResponse = require("../api-response");

class PublisherSevice{
    constructor(client){
        this.Publisher = client.db().collection("Publishers");
    }

    async create(payload) {
        
        const publisher = {name: payload.name, address: payload.address}
        const result = await this.Publisher.insertOne(publisher);
        if (result.insertedCount != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to insert publisher");
        }
    }
    async update(id, payload) {
        const publisher = {name: payload.name, address: payload.address}
        const result = await this.Publisher.updateOne({_id: ObjectId.isValid(id)? new ObjectId(id): null},{$set: publisher});
        if (result.matchedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to update publisher");
        }
    }
        
    async find(){
        const result = await this.Publisher.find({});
        const obj =  await result.toArray();
        return new ApiResponse(true,obj,null);
    }
    async findById(id){
        const result = await this.Publisher.findOne({_id: ObjectId.isValid(id)? new ObjectId(id): null});
        if (result != null) {
            return new ApiResponse(true, result, null);
        } else {
            return new ApiResponse(false,null,"Failed to find publisher");
        }
    }
    async deleteById(id){
        const result = await this.Publisher.deleteOne({_id: ObjectId.isValid(id)? new ObjectId(id): null});
        if (result.matchedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to delete publisher");
        }
    }
    async delete(){
        const result = await this.Publisher.deleteMany({});
        if (result.deletedCount  != 0) {
            return new ApiResponse(true, null, null);
        } else {
            return new ApiResponse(false,null,"Failed to delete all publisher");
        }
    }
}

module.exports = PublisherSevice;