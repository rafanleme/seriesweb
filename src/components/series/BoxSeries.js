import React, { Component } from "react";
import FormularioSeries from "./FormularioSeries";
import TabelaSeries from "./TabelaSeries";
import {
  inserir,
  atualizar,
  listar,
  remover,
  uploadFoto
} from "../../services/series-service";

class BoxSeries extends Component {
  constructor() {
    super();
    this.state = {
      series: []
    };
  }

  async componentDidMount() {
    try {
      const retorno = await listar();
      const series = await retorno.json();
      this.setState({ series: series });
    } catch (erro) {
      console.log(erro);
    }
  }

  enviaDados = async serie => {
    try {
      let retorno = "";
      console.log(serie)
      const foto = serie.foto;
      delete serie.foto;
      delete serie.generos;
      if (serie.id) retorno = await atualizar(serie);
      else retorno = await inserir(serie);
      if (retorno.status === 201) {
        let serieApi = await retorno.json();
        serie.id = serieApi.id;
        serie.foto = foto[0];
        retorno = await uploadFoto(serie);
        serieApi = await retorno.json();
        serie.foto = serieApi.foto;
        return this.setState({
          series: [...this.state.series, serie]
        });
      }
      if (retorno.status === 200) {
        this.setState({
          series: this.state.series.map(s => {
            if(s.id == serie.id){
              serie.foto = s.foto
              return serie
            }
            return s
          })
        });
      }
    } catch (erro) {
      console.log(erro);
    }
  };

  deleta = async id => {
    const seriesAtual = this.state.series;
    const retorno = await remover(id);
    if (retorno.status === 204) {
      this.setState({
        series: seriesAtual.filter(serie => {
          return serie.id !== id;
        })
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <FormularioSeries enviaDados={this.enviaDados} />
          </div>
          <div className="col-md-8">
            <TabelaSeries series={this.state.series} deleta={this.deleta} />
          </div>
        </div>
      </div>
    );
  }
}

export default BoxSeries;
