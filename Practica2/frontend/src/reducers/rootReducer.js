import { combineReducers } from 'redux';
import { mascotaReducer } from './mascotaReducer';
import { uiReducer } from './uiReducer';

export const rootReducer = combineReducers ({
    ui: uiReducer,
    mascota: mascotaReducer
})