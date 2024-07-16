"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publication_cont_1 = require("../controllers/publication.cont");
const pubRt = (0, express_1.Router)();
pubRt.post('/classes/:uniqueID', publication_cont_1.postPublication);
pubRt.delete('/classes/:uniqueID/post/:postID', publication_cont_1.deletePub);
exports.default = pubRt;
