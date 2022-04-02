"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
var db_1 = require("../../db/db");
var register = function (req, res) {
    //TODO
    var mysql = db_1.MySQLDb.getInstance();
    var db = mysql.db;
    var username = req.body.username;
    var password = req.body.password;
    var input = { username: username, password: password };
    db.query("SELECT username FROM users WHERE username = \"" + username + "\"", function (err, results) {
        if (err)
            throw err;
        if (username === results) {
            res.render("register", { result: "Tài khoản đã được sử dụng!" });
            return;
        }
    });
    db.query('INSERT INTO users SET ?', input, function (err, results) {
        if (err)
            throw err;
        res.render("login", { validate: "Đăng kí thành công!" });
    });
};
exports.register = register;
//# sourceMappingURL=register.js.map