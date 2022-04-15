import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Persona from "./Persona";
import reportWebVitals from "./reportWebVitals";

let estudiante = {
  nombre: "Alexis",
  apellido: "Gomez",
  email: "ralexisge@gmail.com",
  dni: "42456256",
  materias: [{materia:"Matematicas", hora:"4 horas"},{materia:"Base de datos",hora:"6 horas"}],
};

ReactDOM.render(
  <React.StrictMode>
    <Persona/>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
