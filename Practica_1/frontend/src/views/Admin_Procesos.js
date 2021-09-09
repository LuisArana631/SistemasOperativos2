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

function Admin_Procesos() {

  let process_data  = get_process_data(get_proc());

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Card>
              <CardHeader>
                <CardTitle tag="h4">Lista de procesos</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th> <b>PID</b></th>
                      <th> <b>PID Padre</b></th>
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
                          <td>{row.father}</td>
                          <td>{row.name}</td>
                          <td>{row.state}</td>
                          <td>{row.usedRAM}%</td>
                          <td>{row.usedCpu}%</td>
                          <td>{row.codeSize}mb</td>
                          <td>{row.usuario}</td>
                          <td><button type="button" class="btn btn-outline-danger mr-1" onClick={() => { kill_proc(row.pid) }}>KILL</button></td>
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

function kill_proc(pid){
  fetch(`http://3.14.79.8:8080/kill/${pid}`)
  .then(response => response.json())
  .then(data => console.log(data));
}

function get_process_data(process_array){
  let array_return = [];
    
  if (process_array.procesos != undefined) {
    Array.from(process_array.procesos).map(row =>  {
        let estado_string = row.state == 0 ? "running" : row.state == 1 ? "stopped" : "zombie" ;

        array_return.push({
          "codeSize": parseFloat(parseInt(row.codeSize)/1000000).toFixed(2),
          "father": row.father,
          "name": row.name,
          "pid": row.pid,
          "state": estado_string,
          "usedCpu": parseFloat(row.usedCpu).toFixed(2),
          "usedRAM": parseFloat(parseInt(row.usedRAM/1000000)*100/978).toFixed(2),
          "usuario": row.usuario
      })
      }      
    );
  }  

  array_return.sort(GetSortOrder("pid"));
  return array_return;
}

function GetSortOrder(prop) {    
  return function(a, b) {    
      if (a[prop] > b[prop]) {    
          return 1;    
      } else if (a[prop] < b[prop]) {    
          return -1;    
      }    
      return 0;    
  }    
}  