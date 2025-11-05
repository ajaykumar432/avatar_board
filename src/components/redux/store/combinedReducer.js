import {combineReducers} from '@reduxjs/toolkit'
import boardReducer from '../slices/boardSlice'
import roomReducer from '../slices/roomSlice';
const rootReducer = combineReducers({
    boards:boardReducer,
    rooms:roomReducer,
})

export default rootReducer