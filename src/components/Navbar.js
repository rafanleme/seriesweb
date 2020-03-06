import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { signOut } from "../services/auth-service";

const ItemMenu = props => {
  const { activate } = props;
  return (
    <li className={props.active === props.item.nome ? "nav-item active" : "nav-item "}>
      <Link className="nav-link" to={props.item.path} onClick={activate}>
        {props.item.nome}
      </Link>
    </li>
  );
};

const listaMenu = [
  { nome: "Home", path: "/" },
  { nome: "Series", path: "/series" },
  { nome: "Autores", path: "/autores" }
];

export const NavBar = withRouter(props => <Bar {...props} />);

class Bar extends Component {
  constructor(props) {
    super();
    this.state = {
      signOut: false,
      active: "Home"
    };
  }

  activate = e => {
    const nome = e.target.innerHTML;
    this.setState({active: nome})
  };

  render() {
    if (this.state.signOut) {
      return <Redirect to="/login" />;
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <Link className="navbar-brand" to="/">
          SERIES
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto" ref={ref => (this.ulMenu = ref)}>
            {listaMenu.map(item => (
              <ItemMenu
                key={item.path}
                item={item}
                active={this.state.active}
                activate={this.activate}
              />
            ))}
          </ul>
          <button
            className="btn btn-outline-danger my-2 my-sm-0"
            onClick={() => {
              signOut();
              this.setState({ signOut: true });
            }}
            type="submit"
          >
            Sair
          </button>
        </div>
      </nav>
    );
  }
}
