const ApiError = require("../api-error");
const ApiResponse = require("../api-response");
const ReceiptService = require("../services/receipt.service")
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
    const receiptService = new ReceiptService(MongoDB.client);
    const document = await receiptService.create(req.body);
    return res.send(document);
}

exports.findAll = async (req, res, next) => {
    /*if (typeof req.cookies.jwt == 'undefined') {
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }
    const cookie = req.cookies.jwt;
    const claim = jwt.verify(cookie, "secret")
    if (claim == null){
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }*/
    const receiptService = new ReceiptService(MongoDB.client);
    const document = await receiptService.find();
    return res.send(document);
} 

exports.findbyId = async (req, res, next) => {
    /*if (typeof req.cookies.jwt == 'undefined') {
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }
    const cookie = req.cookies.jwt;
    const claim = jwt.verify(cookie, "secret")
    if (claim == null){
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }*/
    const receiptService = new ReceiptService(MongoDB.client);
    const document = await receiptService.findById(req.params.id);
    return res.send(document);
} 

exports.findbyClientId = async (req, res, next) => {
    /*if (typeof req.cookies.jwt == 'undefined') {
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }
    const cookie = req.cookies.jwt;
    const claim = jwt.verify(cookie, "secret")
    if (claim == null){
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }*/
    const receiptService = new ReceiptService(MongoDB.client);
    const document = await receiptService.findByClientId(req.params.id);
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
    const receiptService = new ReceiptService(MongoDB.client);
    const document = await receiptService.update(req.params.id,req.body);
    return res.send(document);
}

exports.deleteById = async (req, res, next) => {
    const receiptService = new ReceiptService(MongoDB.client);
    const document = await receiptService.deleteById(req.params.id);
    return res.send(document);
}
exports.delete = async (req, res, next) => {
    const receiptService = new ReceiptService(MongoDB.client);
    const document = await receiptService.delete();
    return res.send(document);
}