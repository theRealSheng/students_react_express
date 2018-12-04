import {
  FETCH_STUDENTS,
  DELETE_STUDENT,
  SELECT_STUDENT,
  CLEAR_SELECT,
  CREATE_STUDENT,
  EDIT_STUDENT
} from './types';
import server from '../apis/server';

export const selectStudent = (student) => {
  return {
    type: SELECT_STUDENT,
    payload: student
  }
}

export const clearSelectedStudent = () => {
  return{
    type: CLEAR_SELECT,
    payload: null
  }
}

export const fetchStudents = () => async(dispatch) => {
  try {
    const response = await server.get('/student/all');
    return dispatch({ type: FETCH_STUDENTS, payload: response.data.students });

  } catch(err) {
    console.log(err.message);
  }
}

export const deleteStudent = (email) => async(dispatch) => {
  try {
    const response = await server.delete(`/student/delete-student/${email}`);
    dispatch({ type: DELETE_STUDENT, payload: response.data.email });
  
  } catch(err) {
    console.log(err.message);
  }
}

export const createStudent = (values, callback) => async(dispatch) => {
  try {
    console.log(values);
    const response = await server.post('/student/create', values)
    if (response.data && response.data.student) {
      callback();
      return dispatch({ type: CREATE_STUDENT, payload: response.data.student });
    }

  } catch(err) {
    console.log(err.message);
  }
}

export const editStudent = (values, callback) => async (dispatch, getState) => {
  try {
    // Unchangeable email
    values.email = getState().studentSelected.email;
    const response = await server.put('/student/edit', values)
    if (response.data && response.data.student) {
      callback();
      this.clearSelectedStudent();
      dispatch({ type: EDIT_STUDENT, payload: response.data.student });
    }

  } catch(err) {
    console.log(err.message);
  }
}

