import { combineReducers } from 'redux';
import simpsonsReducer from './simpsonsReducer';

const reducers = combineReducers({
    simpsonsReducer: simpsonsReducer,
});

export default reducers;