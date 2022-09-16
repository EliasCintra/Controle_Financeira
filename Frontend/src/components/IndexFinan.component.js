import React, { Component } from "react";
// import FinanDataService from "../services/tutorial.service";
import { Chart } from "react-google-charts";
import { IoIosConstruct } from "react-icons/io";


export const data = [
  ["Mes", "Débitos", "Pagos", "A pagar"],
  ["Janeiro", 600, 400, 200],
  ["Fevereiro", 710, 460, 250],
  ["Março", 1420, 1120, 300],
  ["Abril", 890, 540, 350],
];

export default class Index extends Component {
    render() {
        return ( 
        <div className="App">
          <h1> Grafico de Débitos</h1>
          <Chart
          chartType="Bar"
          width="80%"
          height="400px"
          data={data}
        />
          <h6> <strong>OBS:</strong>  Valores fictícios, dashboard ainda em construção. <IoIosConstruct/> </h6>
        </div>
        )
    }  
}