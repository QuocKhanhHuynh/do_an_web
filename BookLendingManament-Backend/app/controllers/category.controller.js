const ApiError = require("../api-error");
const CategoryService = require("../services/category.service")
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
    const categoryService = new CategoryService(MongoDB.client);
    const document = await categoryService.create(req.body);
    return res.send(document);
}

exports.findAll = async (req, res, next) => {
    const categoryService = new CategoryService(MongoDB.client);
    const document = await categoryService.find();
    return res.send(document);
} 

exports.findbyId = async (req, res, next) => {
    const categoryService = new CategoryService(MongoDB.client);
    const document = await categoryService.findById(req.params.id);
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
    const categoryService = new CategoryService(MongoDB.client);
    const document = await categoryService.update(req.params.id,req.body);
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
    const categoryService = new CategoryService(MongoDB.client);
    const document = await categoryService.deleteById(req.params.id);
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
    const categoryService = new CategoryService(MongoDB.client);
    const document = await categoryService.delete();
    return res.send(document);
}