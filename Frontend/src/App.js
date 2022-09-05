import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddFinan from "./components/AddFinan.component";
import EditFinan from "./components/EditFinan.component";
import ListFinan from "./components/ListFinan.component";
import Index from "./components/IndexFinan.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/index"} className="navbar-brand">
            Financeiro
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Debitos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Adicionar
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={ListFinan} />
            <Route exact path="/add" component={AddFinan} />
            <Route path="/tutorials/:id" component={EditFinan} />
            <Route path="index" component={Index} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
