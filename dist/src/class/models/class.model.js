"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassModel = void 0;
const mongoose_1 = require("mongoose");
const chatMessageSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    classID: { type: String, required: true },
    message: { type: String, required: true }
});
const classSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    creator: { type: String, required: true },
    uniqueID: { type: String, require: true },
    webhooks: [{ type: Object }],
    post: [{ type: Object, required: true }],
    chat: [{ type: chatMessageSchema }],
    users: [{ type: String, required: true }]
});
classSchema.methods.generateUniqueID = function () {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueId = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueId += characters[randomIndex];
    }
    return uniqueId;
};
exports.ClassModel = (0, mongoose_1.model)('classes', classSchema);
