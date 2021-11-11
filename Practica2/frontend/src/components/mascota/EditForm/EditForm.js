import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { mascotaUpdateItem } from "../../../actions/mascota";
import { uiCloseModal } from "../../../actions/ui";
import './EditForm.css';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const initForm = {
    mascota: '',
    dueño: '',
    edad: 0
};

export const EditMascota = () => {

    const { modalOpen } = useSelector(state =>  state.ui);
    const { actualMascota } = useSelector(state => state.mascota)
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initForm);
    const { mascota, dueño, edad } = formValues;

    useEffect(() => {
        if( actualMascota ){
            setFormValues(actualMascota);
        }        
    }, [actualMascota, setFormValues]);
    
    const closeModal = () => {
        dispatch(uiCloseModal());
    }

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
        }else if ( edad <= 0 ) {
            return Swal.fire('Error', 'No puedes dejar la edad de la mascota vacío', 'error');
        }
        
        if ( actualMascota ){
            dispatch(mascotaUpdateItem(formValues));
        }
        
        setFormValues(initForm);
        closeModal();
    }

    return (
        <div>
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                className="modal"
                overlayClassName="modal-fondo"
                closeTimeoutMS={200}
            >
                <div className="container">
                    <div className="row bg-green">
                        <div className="col add-form">
                            <h4> Editar mascota </h4>
                        </div>
                    </div>       
                    <div className="row pt-3">
                    <form 
                        className="container"
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

                        <hr />

                        <div className="form-group row">
                            <div className="col text-center">
                                <button type="submit" className="btn btn-success btnSubmit">
                                    Editar
                                </button>
                            </div>                            
                        </div>

                        </form>
                    </div>
                </div>                
            </Modal>
        </div>
    )
}