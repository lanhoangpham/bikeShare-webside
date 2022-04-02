"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pricing = void 0;
var db_1 = require("../../db/db");
var pricing = function (req, res) {
    //TODO
    var mysql = db_1.MySQLDb.getInstance();
    var db = mysql.db;
    var username = req.body.username;
    var password = req.body.password;
    db.query("SELECT * FROM users WHERE username = \"" + username + "\" AND password = \"" + password + "\"", function (err, results) {
        if (err)
            throw err;
        if (results.length === 0) {
            res.render("login", { validate: "Tài khoản không tồn tại hoặc bạn nhập sai mật khẩu, tài khoản" });
            return;
        }
        res.cookie('username', 'admin', { expires: new Date(Date.now() + 9000000000) });
        res.redirect("/");
    });
};
exports.pricing = pricing;
//# sourceMappingURL=pricing.js.map