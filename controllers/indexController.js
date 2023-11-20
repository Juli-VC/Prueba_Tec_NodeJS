const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Función para validar los campos del formulario
const validateUserData = (name, lastname, email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !lastname || !email || !password) {
    return "Todos los campos son obligatorios.";
  }

  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }

  if (!emailRegex.test(email)) {
    return "Por favor, introduce una dirección de correo electrónico válida.";
  }

  return null; // La validación pasó
};

class IndexController {
  // Muestra  homepage
  viewHome = (req, res) => {
    let userLoggedIn = null;

    // Verifica si hay un token en la cookie y decódificalo si existe
    const token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, "secret");
        userLoggedIn = decoded.user;
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }

    res.render("index", { title: "SensiveWeb", userLoggedIn, message: "" });
  };
  // Muestra  ToS --terminos y condiciones
  viewTos = (req, res) => {
    res.render("tos", {
      title: "Sensive- Terminos y condiciones",
      message: "",
    });
  };
  /////////////////
  // Función para registrar un usuario
  registerUser = (req, res) => {
    let { name, lastname, email, password } = req.body;

    // Validar los campos del formulario
    const validationError = validateUserData(name, lastname, email, password);

    if (validationError) {
      return res.render("error", { message: validationError });
    }

    // Hash de la contraseña
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) throw err;

      // Consulta preparada para evitar inyecciones de SQL
      let sql =
        "INSERT INTO user (name, lastname, email, password) VALUES (?, ?, ?, ?)";
      let values = [name, lastname, email, hash];

      connection.query(sql, values, (error, result) => {
        if (error) {
          if (error.code == "ER_DUP_ENTRY") {
            res.render("error", { message: "El email ya existe" });
          } else {
            throw error;
          }
        } else {
          // Cambiar la redirección y el mensaje según tus necesidades
          res.redirect("/");
        }
      });
    });
  };
  // Función para generar un webtoken
  generateToken(user) {
    return jwt.sign({ user }, "secret", { expiresIn: "1h" });
  }
  //Login user
  loginUser = async (req, res) => {
    let { email, password } = req.body;

    // Validar que el correo electrónico esté presente
    if (!email) {
      res.render("index", { message: "Email incorrecto1" });
      return;
    }

    // Construir la consulta SQL con un marcador de posición
    let sql = "SELECT * FROM user WHERE user.email = ?";

    connection.query(sql, [email], (error, result) => {
      if (error) throw error;

      if (result.length == 1) {
        let user = result[0];
        let hash = user.password;
        bcrypt.compare(password, hash, (err, resultCompare) => {
          if (resultCompare) {
            const token = this.generateToken({
              email: user.email,
              username: user.name,
              lastname: user.lastname,
            });
            res.cookie("jwt", token, { httpOnly: true });
            res.redirect("/");
          } else {
            res.render("index", { message: "Contraseña incorrecta" });
          }
        });
      } else {
        res.render("index", { message: "Email incorrecto" });
      }
    });
  };
  //logout Cerrar sesion
  logout = (req, res) => {
    // Clear the JWT cookie
    res.clearCookie("jwt");

    res.redirect("/");
  };
}

module.exports = new IndexController();
