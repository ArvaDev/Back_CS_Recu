"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    mail: { type: String, required: true },
    password: { type: String, required: true },
    tel: { type: String, required: true },
    rol: { type: Boolean, required: true },
    classes: [{ type: String, required: true }],
    tuition: { type: String, required: true },
});
userSchema.methods.encryptPassword = function (pass) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        return yield bcrypt_1.default.hash(pass, salt);
    });
};
userSchema.methods.validatePassword = function (pass) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(pass, this.password);
    });
};
userSchema.methods.generateTuition = function () {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const currentDay = new Date().getDate().toString().padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${currentYear}${currentDay}${randomNum}`;
};
exports.UserModel = (0, mongoose_1.model)('users', userSchema);
