import { SELECT_STUDENT, CLEAR_SELECT } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case SELECT_STUDENT:
      return action.payload;
    case CLEAR_SELECT:
      state = null;
      return null;
    default:
      return state;
  }
};
