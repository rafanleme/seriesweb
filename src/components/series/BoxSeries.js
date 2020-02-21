import React, { Component } from 'react'
import FormularioSeries from './FormularioSeries'
import TabelaSeries from './TabelaSeries'
import { getToken } from '../../services/auth-service'
import { inserir, 
  atualizar, 
  listar, 
  remover } from '../../services/series-service'

class BoxSeries extends Component {

  constructor() {
    super()
    this.state = {
      series: [],
    }
  }

  async componentDidMount() {
    try {
      const retorno = await listar()
      const series = await retorno.json()
      this.setState({ series: series })
    } catch (erro) {
      console.log(erro)
    }
  }

  enviaDados = async (serie) => {
    console.log(serie)
    try {
      let retorno = ''
      if(serie.id) retorno = await atualizar(serie)
      else retorno = await inserir(serie)
      if (retorno.status === 201) {
        return this.setState({
          series: [...this.state.series, serie],
        })
      }
      if (retorno.status === 200) {
        this.setState({
          series: this.state.series.map(s => s.id == serie.id ? serie : s),
        })
      }

    } catch (erro) {
      console.log(erro)
    }

  }

  deleta = async (id) => {
    const seriesAtual = this.state.series
    const retorno = await remover(id)
    if (retorno.status === 204) {
      this.setState({
        series: seriesAtual.filter((serie) => {
          return serie.id !== id
        })
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <FormularioSeries enviaDados={this.enviaDados} />
          </div>
          <div className="col-md-8">
            <TabelaSeries
              series={this.state.series}
              deleta={this.deleta}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default BoxSeries