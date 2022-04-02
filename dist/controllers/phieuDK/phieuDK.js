"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phieuDK = void 0;
var db_1 = require("../../db/db");
var phieuDK = function (req, res) {
    //TODO
    var mysql = db_1.MySQLDb.getInstance();
    var db = mysql.db;
    db.query("INSERT INTO phieudk SET ?", req.body, function (err, results) {
        if (err)
            throw err;
        res.render("phieuDK", { result: "Đăng kí thành công!" });
    });
};
exports.phieuDK = phieuDK;
//# sourceMappingURL=phieuDK.js.map