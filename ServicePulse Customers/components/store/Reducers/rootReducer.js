import ProjectReducer from "./projectReducer"
import {combineReducers} from "redux"



const RootReducer=combineReducers({
    serviceProject:ProjectReducer
})


export default RootReducer;