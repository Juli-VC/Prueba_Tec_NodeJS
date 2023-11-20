const nodemailer = require("nodemailer");

async function main(name, email) {
  // mail account for testing
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  //Contenido del email
  let info = await transporter.sendMail({
    from: "Sensive",
    to: "j_thegod@hotmail.com", // Destinatario. Aqui iría un ${email}, del que rellena el formulario
    subject: "Formulario de contacto recibido",
    html: `
        <h1>Hola ${name}</h1>
        <br>
        <h2>Gracias por contactarnos</h2>
        <br>
        <p>Pronto nos pondremos en contacto con usted</p>
    `,
  });
  console.log("Correo enviado:", info);

  // Obtener la URL de Ethereal para ver el email enviado (se ve en consola)
  console.log(
    "Correo enviado. URL de vista previa: " + nodemailer.getTestMessageUrl(info)
  );
}
module.exports = { main };
