const ApiError = require("../api-error");
const ApiResponse = require("../api-response");
const ClientService = require("../services/client.service")
const MongoDB = require("../utils/mongodb.util")
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    const clientService = new ClientService(MongoDB.client);
    const document = await clientService.login(req.body);
    if (document.status === false){
        return res.send(document);
    }
    res.cookie('jwtClient', document.object, {
        httpOnly: true,
        maxAge: 24* 60 * 60 * 1000
    });
    return res.send(document);
}

exports.logout = async (req, res, next) => {
    res.cookie("jwtClient","",{maxAge: 0});
    return res.send(new ApiResponse(true, null, null));
}

exports.create = async (req, res, next) => {
    /*if (typeof req.cookies.jwt == 'undefined') {
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }
    const cookie = req.cookies.jwt;
    const claim = jwt.verify(cookie, "secret")
    if (claim == null){
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }*/
    const clientService = new ClientService(MongoDB.client);
    const document = await clientService.create(req.body);
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
    const clientService = new ClientService(MongoDB.client);
    const document = await clientService.update(req.params.id, req.body);
    return res.send(document);
}

exports.updatePassword = async (req, res, next) => {
    /*if (typeof req.cookies.jwt == 'undefined') {
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }
    const cookie = req.cookies.jwt;
    const claim = jwt.verify(cookie, "secret")
    if (claim == null){
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }*/
    const clientService = new ClientService(MongoDB.client);
    const document = await clientService.updatePassword(req.params.id, req.body);
    return res.send(document);
}

exports.forgetPassword = async (req, res, next) => {
    /*if (typeof req.cookies.jwt == 'undefined') {
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }
    const cookie = req.cookies.jwt;
    const claim = jwt.verify(cookie, "secret")
    if (claim == null){
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }*/
    const clientService = new ClientService(MongoDB.client);
    const document = await clientService.forgetPassword(req.body);
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
    const clientService = new ClientService(MongoDB.client);
    const document = await clientService.find();
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
    const clientService = new ClientService(MongoDB.client);
    const document = await clientService.findById(req.params.id);
    return res.send(document);
} 
exports.lockAccount = async (req, res, next) => {
    /*if (typeof req.cookies.jwt == 'undefined') {
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }
    const cookie = req.cookies.jwt;
    const claim = jwt.verify(cookie, "secret")
    if (claim == null){
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }*/
    const clientService = new ClientService(MongoDB.client);
    const document = await clientService.lockAcount(req.params.id);
    return res.send(document);
}

exports.findbyCookie = async (req, res, next) => {
    const cookie = req.cookies.jwtClient;
    const claim = jwt.verify(cookie, "secret")
    const clientService = new ClientService(MongoDB.client);
    const document = await clientService.findByCookie(claim._id);
    return res.send(document);
}