"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
//vntb tdxe dhea xfan
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "armandorovi1590@gmail.com",
        pass: "vntb tdxe dhea xfan",
    },
});
const sendMail = (mail, tuition) => {
    exports.transporter.sendMail({
        from: 'Classroom',
        to: mail,
        subject: "Nueva cuenta",
        text: "",
        html: `<h3>Has creado una nueva cuenta en classroom</h3>
                   <h4>Puedes usar esta nueva matrícula para interactuar</h4>
                   <h1>${tuition}</h1>`,
    });
};
exports.sendMail = sendMail;
