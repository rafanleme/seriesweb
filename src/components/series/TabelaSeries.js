import React, { Component } from 'react';
import PubSub from 'pubsub-js'
import './TabelaSeries.css'

const ListaSeries = (props) => {

	if(props.series.erro){
		return <h1>{props.series.erro}</h1>
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
							<img src="/logo192.png" className="card-img" />
						</div>
						<div className="card-footer">
							{serie.temporadas}
							{serie.temporadas > 1 ? ' temporadas' : ' temporada'}
							<br />
							<a href="#">Sinpose</a> <br />
							<div className="text-center mt-1">
								<button
									className="btn btn-outline-danger btn-sm mr-2 p-1"
									onClick={() => {
										if(window.confirm('Confirma a exclusão?'))
											props.deleta(serie.id)
									}}>
									Delete
								</button>
								<button
									className="btn btn-outline-warning btn-sm p-1"
									onClick={() => {
										PubSub.publish('editing',serie)
									}}
								>
									Editar
							</button>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

class TabelaSeries extends Component {

	render() {

		const { series, deleta } = this.props

		return (
			<div className='card'>
				<div className="card-header ">
					<h5 className="text-center">Lista de Series</h5>
				</div>

				<ListaSeries series={series} deleta={deleta} />
			</div>
		)
	}
}

export default TabelaSeries