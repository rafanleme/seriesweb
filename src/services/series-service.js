import { doRequest, doDataRequest } from './baseapi-service'

const RESOURCE = 'series/'

export const listar = () => {
    return doRequest(RESOURCE, 'GET')
}

export const inserir = (serie) => {
    return doRequest(RESOURCE, 'POST', serie)
}

export const remover = (id) => {
    return doRequest(RESOURCE, 'DELETE', '', id)
}

export const atualizar = (serie) => {
    return doRequest(RESOURCE, 'PUT', serie, serie.id)
}

export const uploadFoto = (serie) => {
    return doDataRequest(RESOURCE + 'foto/', 'POST', serie, serie.id)
}