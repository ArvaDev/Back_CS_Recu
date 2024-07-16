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
const ws_1 = require("ws");
const class_cont_1 = require("../src/class/controllers/class.cont");
const server = new ws_1.WebSocket.Server({ port: 8080 });
const clients = new Set();
function wss() {
    server.on('connection', (ws) => {
        clients.add(ws);
        console.log('Client connected');
        ws.on('message', (msg) => __awaiter(this, void 0, void 0, function* () {
            try {
                const message = JSON.parse(Buffer.from(msg).toString('utf-8'));
                yield (0, class_cont_1.putChat)(message);
                ws.send(JSON.stringify(yield (0, class_cont_1.getChat)(message.classID)));
            }
            catch (error) {
                ws.send(JSON.stringify({ status: 'error', message: 'Failed to process message.' }));
            }
        }));
        ws.on('close', () => {
            clients.delete(ws);
            console.log('Client disconnected');
        });
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });
    console.log("WebSocket service active");
}
exports.default = wss;
