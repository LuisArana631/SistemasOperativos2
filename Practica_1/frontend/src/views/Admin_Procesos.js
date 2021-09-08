import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { get_proc } from 'services/services.js'

var tprocesos=0;
var tejecucion=0;
var tsuspendidos=0;
var tdetenidos=0;
var tzombie=0;

function calcular(process_data){
  //let process_data  = get_process_data(get_proc());
  tprocesos=process_data.length;
  for(let i=0; i<process_data.length;i++){
    if(process_data[i].state == "suspended"){
      tsuspendidos++;
    }else if(process_data[i].state == "stopped"){
      tdetenidos++;
    }else if(process_data[i].state == "zombie"){
      tzombie++;
    }else if(process_data[i].state == "running"){
      tejecucion++;
    }
  }
}

function Admin_Procesos() {
  var process_data  = get_process_data(get_proc());
  calcular(process_data);
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
      <Row>
          <Card>
              <CardHeader>
                <CardTitle tag="h4">Administrador de procesos</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th> <b>Total de procesos</b></th>
                      <th> <b>Procesos en ejecución</b></th>
                      <th> <b>Procesos suspendidos</b></th>
                      <th> <b>Procesos detenidos</b></th>
                      <th> <b>Procesos zombies</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{tprocesos}</td>
                      <td>{tejecucion}</td>
                      <td>{tsuspendidos}</td>
                      <td>{tdetenidos}</td>
                      <td>{tzombie}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          
        </Row>
        <Row>
          <Card>
              <CardHeader>
                <CardTitle tag="h4">Arbol de procesos</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th> <b>PID</b></th>
                      <th> <b>Nombre del proceso</b></th>
                      <th> <b>Estado</b></th>
                      <th> <b>%RAM</b></th>
                      <th> <b>%CPU</b></th>
                      <th> <b>Task Codesize</b></th>
                      <th> <b>Usuario</b></th>
                      <th> <b>KILL</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    {process_data.map(row => {
                      return (
                        <tr>
                          <td>{row.pid}</td>
                          <td>{row.name}</td>
                          <td>{row.state}</td>
                          <td>{row.usedRAM}</td>
                          <td>{row.usedCpu}</td>
                          <td>{row.codeSize}</td>
                          <td>{row.usuario}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          
        </Row>
      </div>
    </>
  );
}

export default Admin_Procesos;

function get_process_data(process_array){
  let array_return = [];
    
  if (process_array != undefined) {
    if(process_array.procesos != undefined){
      Array.from(process_array.procesos).map(row =>  {
        let estado_string = row.state == 0 ? "running" : row.state == 1 ? "stopped" : "zombie" ;

        array_return.push({
          "codeSize": row.codeSize,
          "father": row.father,
          "name": row.name,
          "pid": row.pid,
          "state": estado_string,
          "usedCpu": row.usedCpu,
          "usedRAM": row.usedRAM,
          "usuario": row.usuario
        })
      }      
      );
    }
    
  }  

  return array_return;
}