import {
  FETCH_STUDENTS,
  DELETE_STUDENT,
  CREATE_STUDENT
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_STUDENTS:
      return [...action.payload];
    case DELETE_STUDENT:
      return state.filter((student) => student.email !== action.payload);
    case CREATE_STUDENT:
      return [...state, action.payload];
    default:
      return state;
  }
};
