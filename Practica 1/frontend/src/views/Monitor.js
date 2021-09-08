import React, { Component, useEffect } from 'react';
import axios from 'axios';
import Socket from "../variables/socket";
import { Line, Bar } from "react-chartjs-2";
import ReactDOM from 'react-dom';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart,
} from "variables/charts.js";

var timer = null;
class Monitor extends Component{
  constructor() {
    super();
    this.state = { data: [] };
  }

  resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 200);
    });
  }

  

  async asyncCall() {
    console.log('calling');
    const result = await this.resolveAfter2Seconds();
    await axios.post('http://localhost:5000/')
      .then((Response) => {
        console.log("get url exito, datos ")
        console.log(Response);
        
      })
      .catch((error) => {
        console.log("error al llamar url")
      })
    console.log(result);
    // expected output: "resolved"
  }

  
  
  
  componentDidMount() {
    timer = setTimeout(() => console.log('Hello, World!'), 3000)
  }

  componentWillUnmount() {
    clearTimeout(timer);
  }
  
  /*componentDidMount() {
    // hacer un hilo que llame al get process
    fetch("http://localhost:5000/")
    .then(res => res.json)
    .then(console.log("res"))
    .then(json => this.setState({ data: json }));
  }*/


  render(){
    this.asyncCall();
    return(
      
      <>
      <Card>
        <br/>
        <br/>
        <CardTitle tag="h3">Monitor de Memoria</CardTitle>
      </Card>
      <>
      
      </>
      
      <PanelHeader
        size="lg"
        content={
          <Line
            data={dashboardPanelChart.data}
            options={dashboardPanelChart.options}
          />
        }
      /> 
      <div className="content">
       
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Consumo</h5>
                <CardTitle tag="h4">Memoria RAM en tiempo Real</CardTitle>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-round btn-outline-default btn-icon"
                    color="default"
                  >
                    <i className="now-ui-icons loader_gear" />
                  </DropdownToggle>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={dashboardAllProductsChart.data}
                    options={dashboardAllProductsChart.options}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Just
                  Updated
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <h5 className="card-category">Totales</h5>
                <CardTitle tag="h4">Consumo de RAM en el Servidor</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Descripcion</th>
                      <th>Consumo (MB)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Total de memoria RAM del servidor</td>
                      <td>--</td>
                    </tr>
                    <tr>
                      <td>Total de memoria RAM consumida</td>
                      <td>--</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            
            <Card>
              <CardHeader>
                <h5 className="card-category">Porcentajes</h5>
                <CardTitle tag="h4">Consumo de RAM en el Servidor</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Descripcion</th>
                      <th>Consumo (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Porcentaje de consumo de memoria RAM</td>
                      <td>--</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
      </div>
    </>
    );
  }
}

export default Monitor;

