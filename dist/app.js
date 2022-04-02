"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = require("./controllers");
var login_1 = require("./controllers/login/login");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var body_parser_1 = require("body-parser");
var register_1 = require("./controllers/register/register");
var app = express_1.default();
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded());
app.set("view engine", 'ejs');
app.use(express_1.default.static("views"));
app.use(cookie_parser_1.default());
app.post("/login", login_1.login);
app.post("/register", register_1.register);
app.use("/", controllers_1.controller);
app.listen(1422, function () {
    console.info("Listen port 1422");
});
function info(arg0, info) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=app.js.map