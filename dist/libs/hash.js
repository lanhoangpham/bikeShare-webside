"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashIP = exports.hashPassword = exports.buySalt = exports.clientKeyPepper = exports.passPepper = void 0;
var crypto = __importStar(require("crypto"));
exports.passPepper = "passPepper-tuan";
exports.clientKeyPepper = "tuan";
/**
 * Generate salt for password hashing
 */
var buySalt = function () { return crypto.randomBytes(16).toString("hex"); };
exports.buySalt = buySalt;
/**
 * Convert the given pass with the given salt into a hash
 * @param pass
 * @param salt Use buySalt() to generate salt
 */
var hashPassword = function (pass, salt) { return crypto.pbkdf2Sync(pass, salt + exports.passPepper, 100000, 64, "sha512").toString("hex"); };
exports.hashPassword = hashPassword;
/**
 * Method to generate client Key
 * @param ip
 */
var hashIP = function (ip) { return crypto.pbkdf2Sync(ip, exports.clientKeyPepper, 100000, 64, "sha512").toString("hex"); };
exports.hashIP = hashIP;
//# sourceMappingURL=hash.js.map