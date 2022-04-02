"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLDb = void 0;
var mysql_1 = __importDefault(require("mysql"));
var MySQLDb = /** @class */ (function () {
    function MySQLDb() {
        this.connectDb = function () {
            var config = {
                host: "localhost",
                user: "root",
                password: "",
                database: "web"
            };
            var connect = mysql_1.default.createConnection(config);
            console.info("connected db successfully!!");
            return connect;
        };
        this.db = this.connectDb();
    }
    MySQLDb.getInstance = function () {
        if (MySQLDb.instance === undefined) {
            MySQLDb.instance = new MySQLDb();
        }
        return MySQLDb.instance;
    };
    return MySQLDb;
}());
exports.MySQLDb = MySQLDb;
//# sourceMappingURL=db.js.map