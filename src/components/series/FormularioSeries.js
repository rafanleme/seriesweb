import React, { Component } from 'react';

class FormularioSeries extends Component {

	constructor() {
		super()
		this.stateInicial = {
			nome: '',
			lancamento: '',
			temporadas: '',
			sinopse: ''
		}

		this.state = this.stateInicial
	}

	inputHandler = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	enviaDados = (e) => {
		e.preventDefault()
		this.props.enviaDados(this.state)
		this.setState(this.stateInicial)
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
							<label htmlFor='lancamento'>Ano de Lançamento</label>
							<input type="number" id='lancamento' name='lancamento'
								className="form-control"
								value={this.state.lancamento}
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