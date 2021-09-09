import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { get_proc } from 'services/services.js'

var tprocesos=0;
var tejecucion=0;
var tsuspendidos=0;
var tdetenidos=0;
var tzombie=0;
var hijos=[];

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

function verHijos(id, process_data){
  console.log("buscando... "+id);
  hijos=[];
  for(let i=0; i<process_data.length;i++){
    if(process_data[i].father == id){
      hijos.push(process_data[i]);
    }
  }

  console.log(hijos);
  var div=document.getElementById('divprincipal');
  div.style.display="none";
  var div2=document.getElementById('div2');
  div2.style.display="block";
}

function regresar(){
  var div2=document.getElementById('div2');
  div2.style.display="none";
  var div=document.getElementById('divprincipal');
  div.style.display="block";
}

function Admin_Procesos() {

  let process_data  = get_process_data(get_proc());
  calcular(process_data);
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content" display="block" id="divprincipal">
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
                      <th> <b>PID Padre</b></th>
                      <th> <b>Nombre del proceso</b></th>
                      <th> <b>Estado</b></th>
                      <th> <b>%RAM</b></th>
                      <th> <b>%CPU</b></th>
                      <th> <b>Task Codesize</b></th>
                      <th> <b>Usuario</b></th>
                      <th> <b>Hijos</b></th>
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
                          <td><button type="button" class="btn btn-outline-info" onClick={()=>{verHijos(row.pid, process_data)}}>Ver Hijos</button></td>
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
      <div className="content" style={{display:'none'}} id="div2">
      <Row>
          <Card>
              <CardHeader>
                <CardTitle tag="h4">Arbol de procesos</CardTitle>
                <button type="button" class="btn btn-outline-success mr-1" onClick={() => { regresar() }}>REGRESAR</button>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th> <b>PID</b></th>
                      <th> <b>Nombre del proceso</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    {hijos.map(row => {
                      return (
                        <tr>
                          <td>{row.pid}</td>
                          <td>{row.name}</td>
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

export default Admin_Procesos;