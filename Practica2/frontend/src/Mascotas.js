import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { AddForm } from './components/mascota/AddForm/AddForm';
import { TableView } from './components/mascota/TableView/TableView';
import { Navbar } from './components/ui/Navbar';

export const Mascotas = () => {   

    return (
        <Provider store={ store }>
            <div className="row">
                <div className="col">
                    <Navbar />
                </div>                
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <TableView />
                    </div>
                    <div className="col">
                        <AddForm />
                    </div>              
                </div>
            </div>    
        </Provider>        
    )
}
