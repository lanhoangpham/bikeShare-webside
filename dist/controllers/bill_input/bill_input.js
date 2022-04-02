"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bill_input = void 0;
var db_1 = require("../../db/db");
var bill_input = function (req, res) {
    //TODO
    var mysql = db_1.MySQLDb.getInstance();
    var db = mysql.db;
    db.query("INSERT INTO hoadon SET ?", req.body, function (err, results) {
        if (err)
            throw err;
        res.render("bill_input", { result: "Nhập hoá đơn thành công!" });
    });
};
exports.bill_input = bill_input;
//# sourceMappingURL=bill_input.js.map