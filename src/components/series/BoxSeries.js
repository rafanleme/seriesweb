import React, { Component } from 'react'
import FormularioSeries from './FormularioSeries'
import TabelaSeries from './TabelaSeries'
import { getToken } from '../../services/auth-service'
class BoxSeries extends Component {

  constructor() {
    super()
    this.state = {
      series: [],
    }
  }

  async componentDidMount() {
    const token = getToken()
    console.log(token)
    const params = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + getToken()
      }
    }
    let resposta = 
      await fetch('http://localhost:3000/series',params)
    const series = await resposta.json()
    this.setState({ series: series })
  }

  enviaDados = async (serie) => {
    console.log('enviando dados....')
    const method = serie.id ? 'PUT' : 'POST'
    const params = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: getToken()
      },
      body: JSON.stringify(serie)
    }
    const urlParam = serie.id || ''
    try {
      const retorno =
        await fetch('http://localhost:3000/series/' + urlParam, params)
      console.log('enviado com sucesso')
      serie = await retorno.json()
      if (retorno.status === 201) {
        return this.setState({
          series: [...this.state.series, serie],
          serie: this.novaSerie
        })
      }
      if(retorno.status === 200){
        this.setState({
          series: this.state.series.map(s => s.id == serie.id ? serie : s ),
          serie: this.novaSerie
        })
      }
      
    } catch (erro) {
      console.log(erro)
    }

  }

  deleta = async (id) => {
    const seriesAtual = this.state.series
		const params = {
      method: 'DELETE',
      headers: {
        authorization: getToken()
      }
		}
		const retorno = await 
			fetch('http://localhost:3000/series/' + id,params)
		if(retorno.status === 204){
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