import React, { Component } from "react";
import PubSub from "pubsub-js";
import "./TabelaSeries.css";

const ListaSeries = props => {
  if (props.series.erro) {
    return <h1>{props.series.erro}</h1>;
  }

  return (
    <div className="card-body card-body-flex">
      {props.series.map(serie => {
        return (
          <div className="card card-serie" key={serie.id}>
            <div className="card-header">
              <h5 className="card-title">{serie.nome}</h5>
              <h6 className="card-title text-muted mb-0">
                {serie.ano_lancamento}
              </h6>
            </div>
            <div className="card-body">
              <img
                src={"http://localhost:3000/fotos/" + serie.foto}
                className="card-img"
                alt="Foto capa da série"
              />
            </div>
            <div className="card-footer">
              {serie.temporadas}
              {serie.temporadas > 1 ? " temporadas" : " temporada"}
              <br />
              <a
                href="/"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                onClick={() => {
                  PubSub.publish("detail", serie);
                }}
              >
                Ver mais...
              </a>{" "}
              <br />
              <div className="text-center mt-1">
                <button
                  className="btn btn-outline-danger btn-sm mr-2 p-1"
                  onClick={() => {
                    if (window.confirm("Confirma a exclusão?"))
                      props.deleta(serie.id);
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-outline-warning btn-sm p-1"
                  onClick={() => {
                    PubSub.publish("editing", serie);
                  }}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

class TabelaSeries extends Component {
  constructor() {
    super();
    this.state = {
      serieDetalhe: ""
    };
    PubSub.subscribe("detail", (msg, serie) => {
      this.setState({ serieDetalhe: serie });
    });
  }

  render() {
    const serieDetalhe = this.state.serieDetalhe;

    const { series, deleta } = this.props;

    return (
      <div className="card">
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  {serieDetalhe.nome}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img
                  src={"http://localhost:3000/fotos/" + serieDetalhe.foto}
                  className="card-img"
                  alt="Foto capa da série"
                />
                <h5>
                  {serieDetalhe.temporadas}
                  {serieDetalhe.temporadas > 1 ? " temporadas" : " temporada"}
                </h5>
                <h6>{serieDetalhe.ano_lancamento}</h6>
                {serieDetalhe.sinopse}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-header ">
          <h5 className="text-center">Lista de Series</h5>
        </div>

        <ListaSeries series={series} deleta={deleta} />
      </div>
    );
  }
}

export default TabelaSeries;
