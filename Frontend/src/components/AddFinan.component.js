import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddFinan extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeValor = this.onChangeValor.bind(this);
    this.onChangeDia = this.onChangeDia.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      valor: "",
      dia: "",
      published: false,
      
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeValor(e) {
    this.setState({
      valor: e.target.value
    });
  }

  onChangeDia(e) {
    this.setState({
      dia: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      valor: this.state.valor,
      dia: this.state.dia
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          valor: response.data.valor,
          dia: response.data.dia,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      valor: "",
      dia: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Adicionado com Sucesso!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Adicionar
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Nome </label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
                autocomplete="off"
              />
            </div>

            <div className="form-group">
          
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
                autocomplete="off"
              />
            </div>


            <div className="form-group">
              <label htmlFor="valor">Valor</label>
              <input
                type="number"
                displayType={"text"}
                className="form-control"
                id="valor"
                required
                value={this.state.valor}
                onChange={this.onChangeValor}
                name="valor"
                autocomplete="off"
              />
            </div>


            <div className="form-group">
              <label htmlFor="dia">Vencimento</label>
              <input
                type="date"
                min="2022-01-01" max="2022-12-31"
                className="form-control"
                id="dia"
                required
                value={this.state.dia}
                onChange={this.onChangeDia}
                name="dia"
                autocomplete="off"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Gravar
            </button>
          </div>
        )}
      </div>
    );
  }
}
