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
import { thead, tbody } from "variables/general";
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
                      <th> <b>Nombre del proceso</b></th>
                      <th> <b>Estado</b></th>
                      <th> <b>%RAM</b></th>
                      <th> <b>Task Codesize</b></th>
                      <th> <b>Usuario</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tbody.map((prop, key) => {
                      return (
                        <tr key={key}>
                          {prop.data.map((prop, key) => {
                            if (key === thead.length - 1)
                              return (
                                <td key={key} className="text-right">
                                  {prop}
                                </td>
                              );
                            return <td key={key}>{prop}</td>;
                          })}
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
    Array.from(process_array).map(row =>  {
        let estado_string = row.state == 0 ? "running" : row.state == 1 ? "stopped" : "zombie" ;

        array_return.push([String(row.pid), row.name, String(row.father), estado_string])
      }      
    );
  }  

  return array_return;
}