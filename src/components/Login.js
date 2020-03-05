import React, { Component } from 'react'
import './Login.css'
import { signIn } from '../services/auth-service'
import PubSub from 'pubsub-js'

const MsgErro = (props) => {
	return props.mensagem ? (
		<div className='alert alert-danger'>
			{props.mensagem}
		</div>
	) : ('')
}

export default class Login extends Component {

	constructor() {
		super()
		this.state = {
			email: '',
			senha: '',
			msgErro: ''
		}
		PubSub.subscribe('session-expired',(key,msg) => {
			this.setState({ msgErro: msg })
		})
	}

	inputHandler = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	signIn = async (e) => {
		try {
			e.preventDefault()
			const usuario = this.state
			delete usuario.msgErro
			const retorno = await signIn(usuario)
			if (retorno.status === 400) {
				const erro = await retorno.json()
				return this.setState({ msgErro: erro.erro })
			}
			if (retorno.ok) this.props.history.push('/')

		} catch (e) {
			console.log(e)
		}
	}

	render() {
		return (
			<div className="body">
				<form className="form-signin" onSubmit={this.signIn}>
					<img class="mb-4" src="/logo192.png" alt="" width="72" height="72"></img>
					<h1 className="h3 mb-3 font-weight-normal">Por favor, faça login</h1>
					<MsgErro mensagem={this.state.msgErro} />
					<label for="inputEmail" className="sr-only">E-mail</label>
					<input type="email"
						id="email"
						name="email"
						className="form-control"
						placeholder="Endereço de e-mail"
						required autofocus
						onChange={this.inputHandler} />
					<label for="inputPassword" className="sr-only">Senha</label>
					<input type="password"
						id="senha"
						name="senha"
						className="form-control"
						placeholder="Sua senha" required
						onChange={this.inputHandler} />
					<button className="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
				</form>
			</div>
		)
	}

}