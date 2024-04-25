const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const publishsRouter = require("./app/routes/publisher.route");
const emloyeesRouter = require("./app/routes/emloyee.route");
const clientsRouter = require("./app/routes/client.route");
const booksRouter = require("./app/routes/book.route");
const categoriesRouter = require("./app/routes/category.route");
const receiptsRouter = require("./app/routes/receipt.route");

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message: "ok"});
});
app.use("/api/publishers", publishsRouter);
app.use("/api/emloyees", emloyeesRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/books", booksRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/receipts", receiptsRouter);
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});   

module.exports = app;