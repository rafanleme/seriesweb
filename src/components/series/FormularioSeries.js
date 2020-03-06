import React, { Component } from "react";
import PubSub from "pubsub-js";
import { listar } from "../../services/generos-service";

class FormularioSeries extends Component {
  constructor() {
    super();
    this.stateInicial = {
      serie: {
        nome: "",
        ano_lancamento: "",
        id_genero: "",
        temporadas: "",
        sinopse: "",
        foto: null
      }
    };

    this.state = {
      ...this.stateInicial,
      generos: []
    };

    PubSub.subscribe("editing", (msg, serie) => {
      //tira obrigatoriedade de enviar uma foto na edição
      this.fileInput.required = false;
      this.setState({ serie });
      console.log(this.state.serie);
    });

    this.fileInput = "";
  }

  inputHandler = e => {
    const { name, value } = e.target;
    this.setState({ serie: { ...this.state.serie, [name]: value } });
  };

  fileHandler = e => {
    this.setState({ serie: { ...this.state.serie, foto: e.target.files } });
  };

  enviaDados = async e => {
    e.preventDefault();
    console.log(this.state.serie);
    await this.props.enviaDados(this.state.serie);
    this.setState(this.stateInicial);
    this.fileInput.value = "";
    this.fileInput.required = true;
    delete this.state.id;
  };

  carregaGeneros = async () => {
    const response = await listar();
    if (!response.ok) console.log("Erro ao buscar os gêneros!");

    const generos = await response.json();

    this.setState({ generos });
  };

  //carrega os generos
  componentDidMount = async () => {
    this.carregaGeneros();
  };

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="text-center">Cadastro de Series</h5>
        </div>
        <div className="card-body">
          <form method="post" onSubmit={this.enviaDados}>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                className="form-control mb-2"
                value={this.state.serie.nome}
                onChange={this.inputHandler}
              />

              {/* Adicionando o campo genero */}

              <label htmlFor="genero">Genero</label>
              <select
                className="form-control"
                id="genero"
                name="id_genero"
                value={this.state.serie.id_genero}
                onChange={this.inputHandler}
              >
                <option value="">Selecione</option>
                {this.state.generos.map(genero => {
                  return (
                    <option key={genero.id} value={genero.id}>
                      {genero.descricao}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="ano_lancamento">Ano de Lançamento</label>
              <input
                type="number"
                id="ano_lancamento"
                name="ano_lancamento"
                className="form-control"
                value={this.state.serie.ano_lancamento}
                onChange={this.inputHandler}
              />
              <label htmlFor="temporadas">Temporadas</label>
              <input
                type="text"
                id="temporadas"
                name="temporadas"
                className="form-control"
                value={this.state.serie.temporadas}
                onChange={this.inputHandler}
              />
              <label htmlFor="sinopse">Sinopse</label>
              <textarea
                id="sinopse"
                name="sinopse"
                className="form-control"
                value={this.state.serie.sinopse}
                onChange={this.inputHandler}
              ></textarea>
              <label htmlFor="foto">Foto de capa</label>
              <input
                type="file"
                id="foto"
                name="foto"
                required
                className="form-control"
                ref={ref => (this.fileInput = ref)}
                onChange={this.fileHandler}
              />
              <button
                type="submit"
                className="btn btn-success form-control mt-3"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default FormularioSeries;
