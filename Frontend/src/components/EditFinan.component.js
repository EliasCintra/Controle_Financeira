import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class EditFinan extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeValor = this.onChangeValor.bind(this);
    this.onChangeDia = this.onChangeDia.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        description: "",
        valor: "",
        dia: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description
      }
    }));
  }

  onChangeValor(e) {
    const valor = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        valor: valor
      }
    }));
  }
  onChangeDia(e) {
    const dia = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: dia
        }
      };
    });
  }

  getTutorial(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,
      description: this.state.currentTutorial.description,
      valor: this.state.currentTutorial.valor,
      dia: this.state.currentTutorial.dia,
      published: status
    };

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {
    TutorialDataService.update(
      this.state.currentTutorial.id,
      this.state.currentTutorial
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Atualizado debito com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorial() {    
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Debito</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  autocomplete="off"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  autocomplete="off"
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="valor">Valor</label>
                <input
                  type="number"
                  className="form-control"
                  id="valor"
                  autocomplete="off"
                  value={currentTutorial.valor}
                  onChange={this.onChangeValor}
                  
                />
              </div>
              <div className="form-group">
                <label htmlFor="dia">Vencimento</label>
                <input
                  type="date"
                  min="2022-01-01" max="2022-12-31"
                  className="form-control"
                  id="dia"
                  autocomplete="off"
                  value={currentTutorial.dia}
                  onChange={this.onChangedia}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Pago" : "A Pagar"}
              </div>
            </form>

            {currentTutorial.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                A pagar
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Pago
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Deletar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Atualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Clique em um debito...</p>
          </div>
        )}
      </div>
    );
  }
}
