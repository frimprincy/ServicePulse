
import {combineReducers} from 'redux';
import ProjectReducer from './projectReducer';

import UiReducer from './ui';



const RootReducer=combineReducers({
    project:ProjectReducer,
    ui:UiReducer
})


export default RootReducer;