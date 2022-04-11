import React, { Component } from "react";
import "./Persona.css";
export default class extends Component {
  render() {
    let estudiante = {
      nombre: "Alexis",
      apellido: "Gomez",
      email: "ralexisge@gmail.com",
      dni: "42456256",
    };
    return (
      <div className="estiloDiv">
        <p className="estilo">{estudiante.nombre}</p>
        <p className="estilo">{estudiante.apellido}</p>
        <p className="estilo">{estudiante.email}</p>
        <p className="estilo">{estudiante.dni}</p>
      </div>
    );
  }
}
