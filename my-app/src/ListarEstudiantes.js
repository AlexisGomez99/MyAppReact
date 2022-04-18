import React, { Component } from "react";

export default class ListarEstudiantes extends Component {
  constructor(props) {
    super(props);
    this.limpiar = this.limpiar.bind(this);
    this.listarEstudiantes = this.listarEstudiantes.bind(this);
    this.listarMateria = this.listarMateria.bind(this);
    this.legajo = 0;
    this.state = {
      estudiantes: [],
      materias: [],
    };
  }
  listarMateria() {
    fetch("http://localhost:1234/materias")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          materias: json.materias,
          resultado: json.result,
        });
      });
  }
  listarEstudiantes() {
    const { legajo } = this.state;
    fetch("http://localhost:1234/estudiantesid?legajo=" + legajo)
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          estudiantes: json.estudiantes,
          resultado: json.result,
        });
      });
  }
  limpiar() {
    const { estudiantes, materias } = this.state;
    this.setState({ estudiantes: [], materias: [] });
  }
  handlerChange = (event) => {
    const { value } = event.target;
    let { legajo } = this.state;
    legajo = value;
    this.setState({ legajo: legajo });
  };
  render() {
    return (
      <div>
        <div>
          <button onClick={this.listarMateria}>Lista Materias</button>
          <br />
          <button onClick={this.limpiar}>Limpiar</button>
          <br />
        </div>
        <div>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
          ></link>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {this.state.materias &&
                this.state.materias.map((mat, index) => {
                  return (
                    <tr key={index}>
                      <td>{mat.materia}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div>
          <label>legajo</label>
          <br />
          <input name="legajo" onChange={this.handlerChange}></input>
          <br />
          <button onClick={this.listarEstudiantes}>Lista Estudiante</button>
          <br />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
          ></link>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Legajo</th>
                <th>Nombre</th>
                <th>Carrera</th>
                <th>Materias</th>
              </tr>
            </thead>
            <tbody>
              {this.state.estudiantes &&
                this.state.estudiantes.map((p, index) => {
                  return (
                    <tr key={index}>
                      <td>{p.legajo}</td>
                      <td>{p.nombre}</td>
                      <td>{p.carrera}</td>
                      <td>
                        {p.materias &&
                          p.materias.map((mat) => {
                            return mat.materia + ",";
                          })}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
