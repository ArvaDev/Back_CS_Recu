import nodemailer from "nodemailer";
//vntb tdxe dhea xfan
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "armandorovi1590@gmail.com",
        pass: "vntb tdxe dhea xfan",
    },
});

export const sendMail = (mail: string, tuition: string) => {
    transporter.sendMail({
        from: 'Classroom',
            to: mail,
            subject: "Nueva cuenta",
            text: "",
            html: `<h3>Has creado una nueva cuenta en classroom</h3>
                   <h4>Puedes usar esta nueva matrícula para interactuar</h4>
                   <h1>${tuition}</h1>`,
    })
}