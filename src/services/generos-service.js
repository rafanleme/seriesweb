import { doRequest } from './baseapi-service'

const RESOURCE = 'generos/'

export const listar = () => {
    return doRequest(RESOURCE, 'GET')
}

