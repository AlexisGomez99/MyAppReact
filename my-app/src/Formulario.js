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
        materia: "",
        edad: "",
        carrera: "",
      },
      resultado: "",
      materias: [],
    };
  }
  componentDidMount() {
    fetch("http://localhost:1234/materias")
      .then((r) => r.json())
      .then((json) => {
        this.setState({
          materias: json.materias,
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
  handlerSumbit(e) {
    fetch("http://localhost:1234/estudiantes", {
      method: "POST",
      body: JSON.stringify({
        nombre: this.state.form.nombre,
        apellido: this.state.form.apellido,
        legajo: this.state.form.apellido,
        materia: [this.state.form.materia],
        edad: this.state.form.edad,
        carrera: this.state.form.carrera,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.result == "error") {
          this.setState({
            resultado: json.message,
          });
        }
        this.setState({
          resultado: "El estudiante fue creado con exito!",
        });
      });
  }
  render() {
    return (
      <div>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        ></link>

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
                {this.state.materias.map((mat) => (
                  <option value={mat.materia}>{mat.materia}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={this.handlerSumbit}
            >
              Submit
            </button>
          </form>
          <p>{this.state.resultado}</p>
        </div>
      </div>
    );
  }
}
