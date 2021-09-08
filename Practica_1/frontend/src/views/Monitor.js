import React, { useEffect, useState } from 'react';
import { Line, Bar } from "react-chartjs-2";
import socket from "../variables/socket"
//import io from "socket.io-client";

//let socket = io('//localhost:5000/socket.io');
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
  dashboardAllProductsChart,
} from "variables/charts.js";

function Monitor() {
  
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    socket.on('/', comentarios => {
      setComentarios(comentarios)
    });


  }, [comentarios])
 
    return(
      
      <>
      <p>Comentarios: {comentarios}</p>
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

export default Monitor;

