var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jwt = require('jsonwebtoken');

var indexRouter = require("./routes/index");
var indexRouter = require("./routes/index");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')));

// Middleware para variables comunes
app.use((req, res, next) => {
  // Puedes incluir lógica para determinar el valor de userLoggedIn
  // Puedes obtener el token y verificarlo aquí
  let message = "";
  let userLoggedIn = null;
  const token = req.cookies.jwt;

  if (token) {
    try {
      // Verifica el token y extrae la información del usuario
      const decoded = jwt.verify(token, 'secret');
      userLoggedIn = decoded.user;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }
  // Establecer variables para todas las vistas
  res.locals.userLoggedIn = userLoggedIn;
  res.locals.userLoggedIn = message;
  // Llama a next() para pasar al siguiente middleware o ruta
  next();
});


//Routes
app.use("/", indexRouter);
app.use("/index", indexRouter);
app.use("/ToS", indexRouter);
app.use("/Contacto", indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
