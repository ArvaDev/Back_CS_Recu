"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = __importDefault(require("./users/routes/user.router"));
const class_router_1 = __importDefault(require("./class/routes/class.router"));
const publication_router_1 = __importDefault(require("./publications/routes/publication.router"));
const router = (0, express_1.Router)();
router.use(user_router_1.default);
router.use(class_router_1.default);
router.use(publication_router_1.default);
exports.default = router;
