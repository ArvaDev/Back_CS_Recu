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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClassOfUser = exports.deleteUser = exports.getUserById = exports.signinUser = exports.updateUser = exports.deleteClassOfArray = exports.createUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("../models/user.model");
const mailerService_1 = require("../../../services/mailerService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secret = String(process.env.SECRET);
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_model_1.UserModel.findOne({ mail: req.body.mail });
        if (existingUser) {
            res.status(400).json({ success: false, message: "El correo ya está en uso" });
            return;
        }
        const user = new user_model_1.UserModel(req.body);
        user.password = yield user.encryptPassword(user.password);
        user.tuition = user.generateTuition();
        yield user.save();
        yield mailerService_1.transporter.sendMail({
            from: 'Classroom',
            to: req.body.mail,
            subject: "Nueva cuenta",
            text: "",
            html: `<h3>Has creado una nueva cuenta en classroom</h3>
                   <h4>Puedes usar esta nueva matrícula para interactuar</h4>
                   <h1>${user.tuition}</h1>`,
        });
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.createUser = createUser;
const deleteClassOfArray = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_model_1.UserModel.findOneAndUpdate({ tuition: req.params.tuition }, { $pull: { classes: req.params.classID } }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        updatedUser.classes = [...new Set(updatedUser.classes)];
        yield updatedUser.save();
        res.status(200).json({ success: true, message: "Class deleted and duplicates removed successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
});
exports.deleteClassOfArray = deleteClassOfArray;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tuition } = req.params;
        const _a = req.body, { classes } = _a, userData = __rest(_a, ["classes"]);
        const user = yield user_model_1.UserModel.findOne({ tuition });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        Object.assign(user, userData);
        if (classes) {
            user.classes.push(classes);
        }
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ user: user }, secret, { expiresIn: 60 * 15 });
        res.status(200).json({ success: true, message: "User updated successfully", token });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
});
exports.updateUser = updateUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tuition, password } = req.body;
    try {
        const user = yield user_model_1.UserModel.findOne({ tuition }).select('+password');
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const isMatch = yield user.validatePassword(password);
        if (!isMatch) {
            res.status(401).json({ message: "Not authorized", token: null });
            return;
        }
        const _b = user.toObject(), { password: userPassword } = _b, userWithoutPassword = __rest(_b, ["password"]);
        const token = jsonwebtoken_1.default.sign({ user: userWithoutPassword }, secret, { expiresIn: 60 * 15 });
        res.status(200).json({ success: true, token });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.signinUser = signinUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tuition = req.params.tuition;
        const user = yield user_model_1.UserModel.findOne({ tuition }, { password: 0 });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
});
exports.getUserById = getUserById;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.UserModel.deleteOne({ tuition: req.body.tuition });
        res.status(200).json({ message: "Complete delete" });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.deleteUser = deleteUser;
const deleteClassOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idClass = req.params.idClass;
        const idUser = req.params.idUser;
        const updatedUser = yield user_model_1.UserModel.findOneAndUpdate({ tuition: idUser }, { $pull: { classes: idClass } }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Class deleted successfully", user: updatedUser });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
});
exports.deleteClassOfUser = deleteClassOfUser;
