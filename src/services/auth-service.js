import { doPublicRequest } from "./baseapi-service";
import jwtDecode from "jwt-decode";
import PubSub from "pubsub-js";

const RESOURCE = "auth/";

const TOKEN_KEY = "@Series:token";

export const signIn = async usuario => {
  try {
    const retorno = await doPublicRequest(
      RESOURCE + "autenticar/",
      "POST",
      usuario
    );
    if (retorno.ok) {
      usuario = await retorno.json();
      localStorage.setItem(TOKEN_KEY, JSON.stringify(usuario));
    }
    return retorno;
  } catch (erro) {
    console.log(erro);
    return erro;
  }
};

export const signOut = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isSignedIn = () => {
  const usuario = JSON.parse(localStorage.getItem(TOKEN_KEY));
  if (usuario) {
    var jwtDecoded = jwtDecode(usuario.token);
    const nowSec = (Date.now() / 1000) | 0;
    if (nowSec > jwtDecoded.exp) {
      PubSub.publish(
        "session-expired",
        "Seu tempo de sessão expirou, faça login novamente."
      );
      return signOut();
    }
    return usuario;
  }
};

export const getToken = () => {
  const usuario = JSON.parse(localStorage.getItem(TOKEN_KEY));
  return usuario.token;
};
