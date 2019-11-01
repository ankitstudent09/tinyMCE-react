import { combineReducers } from 'redux';


import tinyReducer from './tinyReducer';

const reducer = combineReducers({
    tinyReducer,
});

export default reducer;