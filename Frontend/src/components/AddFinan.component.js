import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
//import { NumericFormat } from 'react-number-format';
import { ImFloppyDisk } from "react-icons/im";
import { ImCross } from "react-icons/im";

export default class AddFinan extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeValor = this.onChangeValor.bind(this);
    this.onChangeDia = this.onChangeDia.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      valor: "",
      dia: "",
      tipo: "",
  
      pagamento: false,
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
  
  onChangeTipo(e) {
    this.setState({
     tipo: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      valor: this.state.valor,
      dia: this.state.dia,
      tipo: this.state.tipo
    };


    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          valor: response.data.valor,
          dia: response.data.dia,
          tipo: response.data.tipo,
          pagamento: response.data.pagamento,
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
      tipo: "",
      pagamento: false,
      submitted: false
    });
  }


  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Adicionado com Sucesso!</h4>
            <button className="btn btn-success mr-2" onClick={this.newTutorial}>
              Adicionar outro
            </button>
            <a href="http://localhost:8081/finan">
            <button className="btn btn-danger mr-2" >
              <ImCross />
              ﾠ  Sair
            </button>
            </a>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Nome: </label>
              <input
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
              <label htmlFor="description">Descrição: </label>
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
              <label htmlFor="valor">Valor: </label>
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
                  /* <NumericFormat
                      prefix={'R$ '}
                      allowLeadingZeros
                      thousandSeparator=","
                      className="form-control"
                      id="valor"
                      //value={this.state.valor}
                      onChange={this.onChangeValor}
                      name="valor"
                      autocomplete="off"  */
              />
            </div>

            <div className="form-group">
              <label htmlFor="dia">Vencimento: </label>
              <input
                type="date"
                min="2000-01-01" max="2099-12-31"
                className="form-control"
                id="dia"
                required
                value={this.state.dia}
                onChange={this.onChangeDia}
                name="dia"
                autocomplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tipo">Plano de conta: ﾠ </label>
                <select id="tipo" name="tipo" required value={this.state.tipo} onChange={this.onChangeTipo}>
                <option selected value="Sem tipo"> ﾠ </option>
                  <option value="Aluguel"> Aluguel </option>
                  <option value="Compras"> Compras </option>
                  <option value="Alimentação"> Alimentação </option>
                  <option value="Transporte"> Transporte </option>
                  <option value="Lazer"> Lazer </option>
                  <option value="Outros"> Outros </option>
                </select>
              </div>

             

          
          
            <button onClick={this.saveTutorial} className="btn btn-success mr-2">
              <ImFloppyDisk />
              ﾠ Gravar
            </button>
            <a href="http://localhost:8081/finan">
            <button className="btn btn-danger mr-2">
              <ImCross />
              ﾠ Sair
            </button>
            </a>
          </div>
        )}
      </div>
    );
  }
}
