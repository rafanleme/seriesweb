import React, { Component } from 'react';
import PubSub from 'pubsub-js'

class FormularioSeries extends Component {

	constructor() {
		super()
		this.stateInicial = {
			nome: '',
			ano_lancamento: '',
			temporadas: '',
			sinopse: ''
		}

		this.state = this.stateInicial

		PubSub.subscribe('editing',(msg,serie) => {
			this.setState(serie)
		})
	}

	inputHandler = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	enviaDados = async (e) => {
		e.preventDefault()
		await this.props.enviaDados(this.state)
		this.setState(this.stateInicial)
		delete this.state.id
	}

	render() {
		return (
			<div className="card">
				<div className="card-header">
					Cadastro de Series
				</div>
				<div className="card-body">
					<form method="post" onSubmit={this.enviaDados}>
						<div className="form-group">
							<label htmlFor='nome'>Nome</label>
							<input type="text" id='nome' name='nome'
								className="form-control mb-2"
								value={this.state.nome}
								onChange={this.inputHandler} />
							<label htmlFor='ano_lancamento'>Ano de Lançamento</label>
							<input type="number" id='ano_lancamento' name='ano_lancamento'
								className="form-control"
								value={this.state.ano_lancamento}
								onChange={this.inputHandler} />
							<label htmlFor='temporadas'>Temporadas</label>
							<input type="text" id='temporadas' name='temporadas'
								className="form-control"
								value={this.state.temporadas}
								onChange={this.inputHandler} />
							<label htmlFor='sinopse'>Sinopse</label>
							<textarea id='sinopse' name='sinopse'
								className="form-control"
								value={this.state.sinopse}
								onChange={this.inputHandler}></textarea>
							<button type='submit'
								className="btn btn-success form-control mt-3">Salvar</button>
						</div>
					</form>
				</div>
			</div>
		)
	}

}


export default FormularioSeries