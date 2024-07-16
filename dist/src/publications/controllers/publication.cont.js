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
exports.deletePub = exports.postPublication = void 0;
const class_model_1 = require("../../class/models/class.model");
const postPublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clase = req.params.uniqueID;
        const post = req.body;
        const classInstance = yield class_model_1.ClassModel.findOne({ uniqueID: clase });
        if (!classInstance) {
            return res.status(404).json({ message: "Class not found" });
        }
        post.id = classInstance.generateUniqueID() + 'PostID';
        post.date = Date.now().toString();
        classInstance.post.push(post);
        classInstance.save();
        res.status(200).json({ success: true });
    }
    catch (_a) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.postPublication = postPublication;
const deletePub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clase = req.params.uniqueID;
        const post = req.params.postID;
        const classInstance = yield class_model_1.ClassModel.findOneAndUpdate({ uniqueID: clase }, { $pull: { post: { id: post } } }, { new: true });
        if (!classInstance) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json({ message: "Post deleted successfully", classInstance });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.deletePub = deletePub;
