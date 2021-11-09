import Swal from 'sweetalert2';
import { fetchManage } from '../helpers/fetch';
import { types } from '../types/types';

const mascotaAddView = (e) => ({
    type: types.mascotaAddNew,
    payload: e
});

export const mascotaAddNew = (e) => {
    return async ( dispatch ) => {

        try {
            const resp = await fetchManage( 'mascota', e, 'POST' );
            const body = await resp.json();

            if(body.status){
                dispatch(mascotaAddView(body.mascota));
            }else{
                Swal.fire('Error', 'Se produjo un error al cargar la mascota', 'error');
            }

        } catch (err) {
            Swal.fire('Error', 'Se produjo un error al cargar la mascota', 'error');
        }   

    }
};

const mascotaLoaded = (e) => ({
    type: types.mascotaLoaded,
    payload: e
});

export const mascotaLoadItems = () => {
    return async ( dispatch ) => {

        try{
            const resp = await fetchManage( 'mascota' );
            const body = await resp.json(); 

            if(body.status) {
                dispatch(mascotaLoaded(body.mascotas));
            }else{
                Swal.fire('Error', 'Se produjo un error al mostrar las mascotas', 'error');
            }   

        } catch (err) {
            Swal.fire('Error', 'Se produjo un error al mostrar las mascotas', 'error');
        }           
    }
}

export const mascotaSetItem = (e) => ({
    type: types.mascotaSetItem,
    payload: e
});

const mascotaUpdated = (e) => ({
    type: types.mascotaEditItem,
    payload: e
});

export const mascotaUpdateItem = (e) => {
    return async(dispatch) => {
        try{
            const resp = await fetchManage( 'mascota/'+e.id , e, 'PUT' );
            const body = await resp.json(); 

            if(body.status) {                
                dispatch(mascotaUpdated(body.mascota));
            }else{
                Swal.fire('Error', 'Se produjo un error al editar la mascota', 'error');
            }

        }catch(err){
            Swal.fire('Error', 'Se produjo un error al editar la mascota', 'error');
        }
    }
};

const mascotaDeleted = (e) => ({
    type: types.mascotaDeleteItem,
    payload: e
});

export const mascotaDeleteItem = (e) => {
    return async (dispatch) => {
        try {

            const resp = await fetchManage( 'mascota/'+e.id , {}, 'DELETE' );
            const body = await resp.json(); 

            if(body.status) {                
                dispatch(mascotaDeleted(e));
            }else{
                Swal.fire('Error', 'Se produjo un error al eliminar la mascota', 'error');
            }
        }catch(err){
            Swal.fire('Error', 'Se produjo un error al eliminar la mascota', 'error');
        }
    }
};

