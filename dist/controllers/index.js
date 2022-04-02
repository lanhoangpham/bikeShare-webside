"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var express_1 = __importDefault(require("express"));
var db_1 = require("../db/db");
exports.controller = express_1.default.Router();
exports.controller.get("/", function (req, res) {
    if (req.cookies.username !== "admin") {
        res.redirect("/login");
        return;
    }
    res.render("index");
});
exports.controller.get("/login", function (req, res) {
    if (req.cookies.username === "admin") {
        res.redirect("/");
        return;
    }
    res.render("login", { validate: "" });
});
exports.controller.get("/register", function (req, res) {
    res.render("register", { result: "" });
});
exports.controller.get("/homepage", function (req, res) {
    res.render("homepage");
});
exports.controller.get("/info", function (req, res) {
    var mysql = db_1.MySQLDb.getInstance();
    var db = mysql.db;
    db.query("SELECT * FROM users", function (err, results) {
        if (err)
            throw err;
        var user = results;
        res.render("info", { user: user });
    });
});
exports.controller.get("/wallet", function (req, res) {
    res.render("wallet");
});
exports.controller.get("/ticket", function (req, res) {
    res.render("ticket");
});
exports.controller.get("/history", function (req, res) {
    var mysql = db_1.MySQLDb.getInstance();
    var db = mysql.db;
    db.query("SELECT * FROM statusbike", function (err, results) {
        if (err)
            throw err;
        var history = results;
        res.render("history", { history: history });
    });
});
exports.controller.get("/instruction", function (req, res) {
    res.render("instruction");
});
// function formatData(data: any[]) {
//     const formattedData = data.map((i: any) => {
//         const birth = new Date(i.NgaySinh);
//         const NgayLapHD = new Date(i.NgayLapHD);
//         const date = new Date(i.NgayNop);
//         const NgayBD = new Date(i.NgayBD);
//         const NgayLP = new Date(i.NgayLP);
//         return {
//             ...i,
//             NgaySinh: birth.getFullYear()+'-' + (birth.getMonth()+1) + '-'+birth.getDate(),
//             NgayLapHD: NgayLapHD.getFullYear()+'-' + (NgayLapHD.getMonth()+1) + '-'+NgayLapHD.getDate(),
//             NgayNop: date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate(),
//             NgayBD: NgayBD.getFullYear()+'-' + (NgayBD.getMonth()+1) + '-'+NgayBD.getDate(),
//             NgayLP: NgayLP.getFullYear()+'-' + (NgayLP.getMonth()+1) + '-'+NgayLP.getDate(),
//         }
//     })
//     return formattedData
// }
//# sourceMappingURL=index.js.map