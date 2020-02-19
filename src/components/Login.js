import React, { Component } from 'react'
import './Login.css'

export default class Login extends Component {

	constructor() {
		super()
		this.state = {
			email: '',
			senha: ''
		}
	}

	inputHandler = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	signIn = async (e) => {
		e.preventDefault()
		const { email, senha } = this.state
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				senha: senha
			})
		}
		try{
			const retorno 
				= await fetch('http://localhost:3000/auth/autenticar',params)
			
			console.log(retorno)
			const usuario = await retorno.json()
			console.log(usuario)

		}catch(e){
			console.log(e)
		}
	}

	render() {
		return (
			<form className="form-signin" onSubmit={this.signIn}>
				<img class="mb-4" src="/logo192.png" alt="" width="72" height="72"></img>
				<h1 className="h3 mb-3 font-weight-normal">Por favor, faça login</h1>
				<label for="inputEmail" className="sr-only">E-mail</label>
				<input type="email"
					id="inputEmail"
					className="form-control"
					placeholder="Endereço de e-mail"
					required autofocus
					onChange={this.inputHandler} />
				<label for="inputPassword" className="sr-only">Senha</label>
				<input type="password"
					id="inputPassword"
					className="form-control"
					placeholder="Sua senha" required
					onChange={this.inputHandler} />
				<button className="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
			</form>
		)
	}

}