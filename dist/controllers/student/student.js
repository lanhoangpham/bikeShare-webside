"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.student = void 0;
var db_1 = require("../../db/db");
var student = function (req, res) {
    var mysql = db_1.MySQLDb.getInstance();
    var db = mysql.db;
    db.query('INSERT INTO sinhvien SET ?', req.body, function (err, results) {
        if (err)
            throw err;
        res.render("student", { student: "Nhập thông tin thành công!" });
    });
};
exports.student = student;
//# sourceMappingURL=student.js.map