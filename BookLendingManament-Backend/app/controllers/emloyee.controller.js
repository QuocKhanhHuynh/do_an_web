const ApiError = require("../api-error");
const ApiResponse = require("../api-response");
const { options } = require("../routes/emloyee.route");
const EmloyeeService = require("../services/emloyee.service")
const MongoDB = require("../utils/mongodb.util")
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    const emloyeeService = new EmloyeeService(MongoDB.client);
    const document = await emloyeeService.login(req.body);
    /*if (document.status === false){
        return res.send(document);
    }
    res.cookie('jwt', document.object, {
        httpOnly: true,
        maxAge: 24* 60 * 60 * 1000
    });
    return res.send(new ApiResponse(true, document, null));*/
    res.cookie('jwt', document.object, {
        httpOnly: true,
        maxAge: 24* 60 * 60 * 1000
    });
    return res.send(document);
}

exports.logout = async (req, res, next) => {
    res.cookie("jwt","",{maxAge: 0});
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
    const emloyeeService = new EmloyeeService(MongoDB.client);
    const document = await emloyeeService.create(req.body);
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
    const emloyeeService = new EmloyeeService(MongoDB.client);
    const document = await emloyeeService.update(req.params.id, req.body);
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
    const emloyeeService = new EmloyeeService(MongoDB.client);
    const document = await emloyeeService.updatePassword(req.params.id, req.body);
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
    const emloyeeService = new EmloyeeService(MongoDB.client);
    const document = await emloyeeService.forgetPassword(req.body);
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
    const emloyeeService = new EmloyeeService(MongoDB.client);
    const document = await emloyeeService.find();
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
    const emloyeeService = new EmloyeeService(MongoDB.client);
    const document = await emloyeeService.findById(req.params.id);
    return res.send(document);
}

exports.findbyCookie = async (req, res, next) => {
    console.log('ok');
    const cookie = req.cookies.jwt;
    const claim = jwt.verify(cookie, "secret")
    const emloyeeService = new EmloyeeService(MongoDB.client);
    const document = await emloyeeService.findByCookie(claim._id);
    return res.send(document);
}