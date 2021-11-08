import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { mascotaAddNew } from "../../../actions/mascota";
import './AddForm.css';

const initForm = {
    mascota: '',
    dueño: '',
    edad: ''
};

export const AddForm = () => {

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initForm);
    
    const { mascota, dueño, edad } = formValues;

    const handleChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if ( mascota.trim().length < 1 ) {
            return Swal.fire('Error', 'No puedes dejar el nombre de la mascota vacío', 'error');
        }else if ( dueño.trim().length < 1 ) {
            return Swal.fire('Error', 'No puedes dejar el nombre del dueño vacío', 'error');
        }else if ( edad.trim().length < 1 ) {
            return Swal.fire('Error', 'No puedes dejar la edad de la mascota vacío', 'error');
        }

        dispatch(mascotaAddNew(formValues)); 

        setFormValues(initForm);
    }

    return (
        <div className="container">
            <div className="row card card-body bg-green">
                <div className="col bg-green-2 add-form">
                    <h4 className="card-title pb-3">Agregar una mascota</h4>
                    <form
                        onSubmit={ handleSubmit }
                    >
                        <div className="form-group row">
                            <i className="col-sm-1 col-form-label fa-solid fa-dog"></i>
                            <div className="col-sm-11">                                   
                                <input 
                                    type="text" 
                                    name="mascota" 
                                    className="form-control" 
                                    value={mascota} 
                                    onChange={ handleChange } 
                                    placeholder="Nombre de la mascota"
                                />
                            </div>                            
                        </div>
                        
                        <div className="form-group row">
                            <i className="col-sm-1 col-form-label fa-solid fa-user"></i>
                            <div className="col-sm-11"> 
                                <input 
                                    type="text" 
                                    name="dueño" 
                                    className="form-control" 
                                    value={dueño} 
                                    onChange={ handleChange } 
                                    placeholder="Nombre del dueño"
                                />
                            </div>                            
                        </div>

                        <div className="form-group row">
                            <i  className="col-sm-1 col-form-label fa-solid fa-calendar"></i>
                            <div className="col-sm-9"> 
                                <input 
                                    type="number" 
                                    name="edad" 
                                    className="form-control" 
                                    value={edad} 
                                    onChange={ handleChange } 
                                    placeholder="Edad de la mascota"
                                />
                            </div>                
                            <label className="col-sm-2 col-form-label"> <b>Años</b></label>            
                        </div>   
                        
                        <hr/>

                        <div className="form-group row">
                            <div className="col text-center">
                                <button type="submit" className="btn btn-success btnSubmit">
                                    Agregar Mascota
                                </button>
                            </div>                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}