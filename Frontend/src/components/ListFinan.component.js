import React, { Component } from "react";
import FinanDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import { ImBin2 } from "react-icons/im";
import { ImPencil } from "react-icons/im";
import { ImSearch } from "react-icons/im";

export default class ListFinan extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.selecioneDebito = this.selecioneDebito.bind(this);
    this.removaTodosDebitos = this.removaTodosDebitos.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      finan: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    FinanDataService.getAll()
      .then(response => {
        this.setState({
          finan: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  selecioneDebito(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removaTodosDebitos() {
    FinanDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

    FinanDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          finan: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, finan, currentTutorial, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquise por nome do debito."
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                <ImSearch />
                   Pesquisar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Listar Debitos</h4>

          <ul className="list-group">
            {finan &&
              finan.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.selecioneDebito(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removaTodosDebitos}
          >
            <ImBin2  /> 
            ﾠRemover Tudo  
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Debito</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
              
              <div>
                <label>
                  <strong>Valor:</strong>
                </label>{" R$ "}
                {currentTutorial.valor}
              </div>
              <div>
                <label>
                  <strong>Data:</strong>
                </label>{" "}
                {currentTutorial.dia}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.pagamento ? " Pago" : " A pagar"}
              </div>

              <Link
                to={"/finan/" + currentTutorial.id}
                className="badge badge-warning"
              >
                <ImPencil />
                ﾠEditar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Selecione ou adicione um Debito...</p>
              <br />
            </div>
          )}
        </div>
      </div>
    );
  }
}
