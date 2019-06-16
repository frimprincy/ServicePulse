import {combineReducers} from "redux"
import ProjectReducer from './projectReducer';


const RootReducer=combineReducers({
    project:ProjectReducer
})


export default RootReducer;