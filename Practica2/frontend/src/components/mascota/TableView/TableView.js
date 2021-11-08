import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './TableView.css';

import { EditMascota } from "../EditForm/EditForm";
import { uiOpenModal } from "../../../actions/ui";
import { mascotaDeleteItem, mascotaLoadItems, mascotaSetItem } from "../../../actions/mascota";

export const TableView = () => {

    const { mascotas } = useSelector(state =>  state.mascota);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( mascotaLoadItems() );
    }, [dispatch]);

    const editItem = (e) => {
        dispatch(mascotaSetItem(e));
        dispatch(uiOpenModal());    
    }

    const eliminarItem = (e) => {
        dispatch(mascotaDeleteItem(e));
    }

    return (
        <div className="row card card-body table-view">
            <div className="col">
                <h4 className="card-title">Lista de Mascotas</h4>    
                <table className="table table-bordered table-sm">
                    <thead className="bg-green">
                        <tr>
                            <th  scope="col">Nombre</th>
                            <th  scope="col">Dueño</th>
                            <th  scope="col">Edad</th>
                            <th  scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mascotas.map(mascotaItem => {
                            return (
                                <tr key={mascotaItem.id}>
                                    <td className="text-center">{mascotaItem.mascota}</td>
                                    <td className="text-center">{mascotaItem.dueño}</td>
                                    <td className="text-center">{mascotaItem.edad}</td>
                                    <td>
                                        <div className="row">
                                            <div className="col text-center"> 
                                                <button onClick={() => {editItem(mascotaItem)}} className="btn btn-info mx-1 btnSubmit-2"><i className="col-sm-1 col-form-label fa-solid fa-pen-to-square"/></button>
                                                <button onClick={() => {eliminarItem(mascotaItem)}} className="btn btn-danger mx-1 btnSubmit-2"><i className="col-sm-1 col-form-label fa-solid fa-trash-can"/></button>
                                            </div>
                                        </div>                              
                                    </td>
                                </tr>
                            );
                        })}                        
                    </tbody>
                </table>
            </div>

            <EditMascota />
        </div>
    )
}