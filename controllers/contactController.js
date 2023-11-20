const connection = require("../config/db");
const { main } = require("../config/nodemailer.js");
const nodemailer = require("nodemailer");

class contactController {
  // Muestra  Contact View
  viewContact = (req, res) => {
    res.render("contact", { title: "Sensive - Contactanos", message: "" });
  };
  // Muestra  view cuando se envía el formulario (éxito o error)
  viewcontactResponse = (req, res) => {
    res.render("contactResponse", {
      title: "Sensive - Envio de Formulario ",
      message: "",
    });
  };

  //Envío de formulario Contacto
  sendContactForm = (req, res) => {
    const { name, email, address, message } = req.body;

    const insertContactForm =
      "INSERT INTO contactos (name, email, address, message) VALUES (?, ?, ?, ?)"; //Para prevenir contra sql inyecction.
    connection.query(
      insertContactForm,
      [name, email, address, message],
      (error, results) => {
        if (error) {
            console.error("Error al insertar en MySQL: ", error);
            res.status(500).render("contactResponse", {
              title: "Error al procesar el formulario",
              message: "Hubo un problema al procesar el formulario. Inténtelo de nuevo.",
            });
          } else {
            console.log("Datos insertados en MySQL:", results);
            main(name, email);
            res.status(200).render("contactResponse", {
              title: "Formulario guardado exitosamente",
              message: "Formulario guardado exitosamente",
              success: true
            });
        }
      }
    );
  };
}
module.exports = new contactController();
