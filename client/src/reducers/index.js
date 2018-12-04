import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import studentListReducer from './studentListReducer';
import studentSelectReducer from './studentSelectReducer';

const rootReducer = combineReducers({
  studentList: studentListReducer,
  studentSelected: studentSelectReducer,
  form: formReducer
})

export default rootReducer;