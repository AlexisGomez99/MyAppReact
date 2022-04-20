import React, { Component } from "react";
import "./Formulario.css";
export default class Formulario extends Component {
  constructor(props) {
    super(props);
    this.handlerSumbit = this.handlerSumbit.bind(this);
    this.handlerChange = this.handlerChange.bind(this);
    this.state = {
      form: {
        nombre: "",
        apellido: "",
        legajo: "",
        materias: [],
        edad: "",
        carrera: "",
      },
      resultado: "",
      materiaslog: [],
    };
  }

  handlerSumbit(e) {
    fetch("http://localhost:1234/estudiantes", {
      method: "POST",
      body: JSON.stringify({
        nombre: this.state.form.nombre,
        apellido: this.state.form.apellido,
        legajo: this.state.form.legajo,
        materias: ["Materia 1", "Materia 2"],
        edad: this.state.form.edad,
        carrera: this.state.form.carrera,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.result === "error") {
          this.setState({
            resultado: json.message,
          });
          console.log(this.state.form);
          return;
        }
        this.setState({
          resultado: "El estudiante fue creado con exito!",
        });
      });
  }
  componentDidMount() {
    fetch("http://localhost:1234/materias")
      .then((r) => r.json())
      .then((json) => {
        this.setState({
          materiaslog: json.materias,
        });
      });
  }
  handlerChange(e) {
    let nombre = e.target.name;
    let valor = e.target.value;

    this.setState((state) => ({
      form: {
        ...state.form,
        [nombre]: valor,
      },
    }));
  }
  render() {
    return (
      <div>
        <div className="estilo">
          <form>
            <label>Nombre </label>
            <div className="estiloDiv">
              <input
                size="25"
                type="text"
                name="nombre"
                onChange={this.handlerChange}
                value={this.state.nombre}
              ></input>
            </div>
            <br />
            <label>Apellido</label>
            <div className="estiloDiv">
              <input
                size="25"
                type="text"
                name="apellido"
                onChange={this.handlerChange}
                value={this.state.nombre}
              ></input>
            </div>
            <br />
            <label>N°Legajo</label>
            <div className="estiloDiv">
              <input
                size="25"
                type="text"
                name="legajo"
                onChange={this.handlerChange}
                value={this.state.nombre}
              ></input>
            </div>
            <br />
            <label>Edad</label>
            <div className="estiloDiv">
              <input
                size="25"
                type="text"
                name="edad"
                onChange={this.handlerChange}
                value={this.state.edad}
              ></input>
            </div>
            <br />
            <label>Carrera</label>
            <div className="estiloDiv">
              <input
                size="25"
                type="text"
                name="carrera"
                onChange={this.handlerChange}
                value={this.state.carrera}
              ></input>
            </div>
            <br />
            <div className="estiloDiv">
              <select name="materia" onChange={this.handlerChange}>
                {this.state.materiaslog.map((mat) => (
                  <option value={mat.materia}>{mat.materia}</option>
                ))}
              </select>
            </div>
          </form>
          <button onClick={this.handlerSumbit}>Submit</button>
          <p>{this.state.resultado}</p>
        </div>
      </div>
    );
  }
}
