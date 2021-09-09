import React from 'react';
import { Line } from "react-chartjs-2";
import { get_ram } from 'services/services.js'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  UncontrolledDropdown,
  DropdownToggle,
  Table
} from "reactstrap";

//** Grafica */
// General configuration for the charts with Line gradientStroke
const arrval=[];
var cont=0;
const arrlabels=[];
const chartColor = "#FFFFFF";
const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltips: {
      bodySpacing: 4,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10,
    },
  },
  responsive: 1,
  scales: {
    y: {
      display: 0,
      ticks: {
        display: false,
        maxTicksLimit: 7,
      },
      grid: {
        zeroLineColor: "transparent",
        drawTicks: false,
        display: false,
        drawBorder: false,
      },
    },
    x: {
      display: 0,
      ticks: {
        display: false,
      },
      grid: {
        zeroLineColor: "transparent",
        drawTicks: false,
        display: false,
        drawBorder: false,
      },
    },
  },
  layout: {
    padding: { left: 0, right: 0, top: 15, bottom: 15 },
  },
};

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

const dashboard= {
  data: (canvas) => {
    var ctx = canvas.getContext("2d");
    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#18ce0f");
    gradientStroke.addColorStop(1, chartColor);
    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, hexToRGB("#18ce0f", 0.4));
    return {
      labels: arrlabels,
      datasets: [
        {
          label: "RAM Stats",
          borderColor: "#18ce0f",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#18ce0f",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          tension: 0.4,
          data: arrval,
        },
      ],
    };
  },
  options: options,
};


function Monitor() {

    let datos = get_ram();
    cont++;
    if(datos.porcentajeUsed == undefined){
      arrlabels.push("Lectura No."+cont);
      arrval.push(0);
    }else{
      arrlabels.push("Lectura No."+cont);
      arrval.push(datos.porcentajeUsed);
    }
    console.log(arrlabels);
    console.log(arrval);

    return(      
      <>
      <Card>
        <br/>
        <br/>
        <CardTitle tag="h3">Monitor de Memoria</CardTitle>
      </Card>
      
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
                    <i className="now-ui-icons loader_refresh" />
                  </DropdownToggle>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={dashboard.data}
                    options={dashboard.options}
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
                      <td>{datos.totalRam}</td>
                    </tr>
                    <tr>
                      <td>Total de memoria RAM consumida</td>
                      <td>{datos.usedRam}</td>
                    </tr>
                    <tr>
                      <td>Total de memoria RAM libre</td>
                      <td>{datos.freeRam}</td>
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
                      <td>{datos.porcentajeUsed}</td>
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

