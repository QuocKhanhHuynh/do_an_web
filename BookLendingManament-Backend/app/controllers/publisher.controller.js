const ApiError = require("../api-error");
const PublisherService = require("../services/publisher.service")
const MongoDB = require("../utils/mongodb.util")
const jwt = require('jsonwebtoken');

exports.create = async (req, res, next) => {
    /*if (typeof req.cookies.jwt == 'undefined') {
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }
    const cookie = req.cookies.jwt;
    const claim = jwt.verify(cookie, "secret")
    if (claim == null){
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }*/
    const publishService = new PublisherService(MongoDB.client);
    const document = await publishService.create(req.body);
    return res.send(document);
}

exports.findAll = async (req, res, next) => {
    const publishService = new PublisherService(MongoDB.client);
    const document = await publishService.find();
    return res.send(document);
} 

exports.findbyId = async (req, res, next) => {
    const publishService = new PublisherService(MongoDB.client);
    const document = await publishService.findById(req.params.id);
    return res.send(document);
} 

exports.update = async (req, res, next) => {
    /*if (typeof req.cookies.jwt == 'undefined') {
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }
    const cookie = req.cookies.jwt;
    const claim = jwt.verify(cookie, "secret")
    if (claim == null){
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }*/
    const publishService = new PublisherService(MongoDB.client);
    const document = await publishService.update(req.params.id,req.body);
    return res.send(document);
}

exports.deleteById = async (req, res, next) => {
    /*if (typeof req.cookies.jwt == 'undefined') {
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }
    const cookie = req.cookies.jwt;
    const claim = jwt.verify(cookie, "secret")
    if (claim == null){
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }*/
    const publishService = new PublisherService(MongoDB.client);
    const document = await publishService.deleteById(req.params.id);
    return res.send(document);
}
exports.delete = async (req, res, next) => {
    /*if (typeof req.cookies.jwt == 'undefined') {
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }
    const cookie = req.cookies.jwt;
    const claim = jwt.verify(cookie, "secret")
    if (claim == null){
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }*/
    const publishService = new PublisherService(MongoDB.client);
    const document = await publishService.delete();
    return res.send(document);
}