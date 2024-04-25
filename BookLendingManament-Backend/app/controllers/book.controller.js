const ApiError = require("../api-error");
const BookService = require("../services/book.service")
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

    const bookService = new BookService(MongoDB.client);
    const document = await bookService.create(req.body);
    return res.send(document);
}

exports.findAll = async (req, res, next) => {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.find();
    return res.send(document);
} 

exports.findbyId = async (req, res, next) => {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.findById(req.params.id);
    return res.send(document);
} 

exports.update = async (req, res, next) => {
   /* if (typeof req.cookies.jwt == 'undefined') {
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }
    const cookie = req.cookies.jwt;
    const claim = jwt.verify(cookie, "secret")
    if (claim == null){
        res.send(new ApiResponse(false, null, 'Chưa xác thực'))
    }*/
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.update(req.params.id,req.body);
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
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.deleteById(req.params.id);
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
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.delete();
    return res.send(document);
}