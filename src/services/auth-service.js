import { doPublicRequest } from './baseapi-service'

const RESOURCE = 'auth/'

const TOKEN_KEY = '@Series:token'

export const signIn = async (usuario) => {
    try{
        const retorno = 
            await doPublicRequest(RESOURCE + 'autenticar/','POST',usuario)
        console.log(retorno)
        if(retorno.ok){
            usuario = await retorno.json()
            localStorage.setItem(TOKEN_KEY,JSON.stringify(usuario))
        }
        return retorno
    }catch(erro){
        console.log(erro)
        return erro
    }
    
}

export const signOut = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export const isSignedIn = () => {
    const usuario = localStorage.getItem(TOKEN_KEY)
    return JSON.parse(usuario)
}

export const getToken = () => {
    const usuario = JSON.parse(localStorage.getItem(TOKEN_KEY))
    return usuario.token
}