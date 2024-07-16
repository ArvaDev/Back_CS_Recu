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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassChat = exports.getChat = exports.putChat = exports.deleteClass = exports.getClass = exports.putClassUserID = exports.getUserByClass = exports.addWebHook = exports.createClass = void 0;
const class_model_1 = require("../models/class.model");
const createClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clase = new class_model_1.ClassModel(req.body);
        clase.uniqueID = String(clase.generateUniqueID());
        yield clase.save();
        res.status(200).json({ success: true, classID: clase.uniqueID });
    }
    catch (_a) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createClass = createClass;
const addWebHook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clase = yield class_model_1.ClassModel.findOne({ uniqueID: req.params.uniqueID });
        if (!clase) {
            return res.status(404).json({ message: "Clase no encontrada" });
        }
        clase.webhooks.push(req.body.webhook);
        clase.save();
        res.status(200).json({ success: true, message: "Webhook add" });
    }
    catch (_b) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addWebHook = addWebHook;
const getUserByClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clase = yield class_model_1.ClassModel.findOne({ uniqueID: req.params.uniqueID });
        if (!clase) {
            return res.status(404).json({ message: "Clase no encontrada" });
        }
        res.status(200).json({ success: true, users: clase.users });
    }
    catch (_c) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserByClass = getUserByClass;
const putClassUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clase = yield class_model_1.ClassModel.findOne({ uniqueID: req.params.uniqueID });
        if (!clase) {
            return res.status(404).json({ message: "Clase no encontrada" });
        }
        if (!clase.users) {
            clase.users = [];
        }
        clase.users.push(req.body.user);
        yield clase.save();
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.error('Error al obtener la clase:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.putClassUserID = putClassUserID;
const getClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clase = yield class_model_1.ClassModel.findOne({ uniqueID: req.params.uniqueID });
        if (!clase) {
            return res.status(404).json({ message: "Clase no encontrada" });
        }
        res.status(200).json(clase);
    }
    catch (error) {
        console.error('Error al obtener la clase:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getClass = getClass;
const deleteClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clase = yield class_model_1.ClassModel.findOne({ uniqueID: req.params.uniqueID });
        if (!clase) {
            return res.status(404).json({ message: "Class not found" });
        }
        yield clase.deleteOne({ uniqueID: req.params.uniqueID });
        res.status(200).json({ success: true });
    }
    catch (_d) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteClass = deleteClass;
const putChat = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clase = yield class_model_1.ClassModel.findOne({ uniqueID: msg.classID });
        if (clase) {
            clase.chat.push(msg);
            yield clase.save();
            console.log('Message saved to class:', msg.classID);
        }
        else {
            console.log("Class not found");
        }
    }
    catch (error) {
        console.error('Error saving chat message:', error);
        throw error;
    }
});
exports.putChat = putChat;
const getChat = (classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clase = yield class_model_1.ClassModel.findOne({ uniqueID: classID });
        if (clase) {
            return clase.chat;
        }
        else {
            console.log("Class not found");
        }
    }
    catch (error) {
        console.error('Error saving chat message:', error);
        throw error;
    }
});
exports.getChat = getChat;
const getClassChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uniqueID } = req.params;
        const clase = yield class_model_1.ClassModel.findOne({ uniqueID: uniqueID });
        if (!clase) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json({ chat: clase.chat });
    }
    catch (_e) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getClassChat = getClassChat;
