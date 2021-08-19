import { combineReducers } from 'redux';
import {
  LOGIN,
  SIGNUP,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_USERNAME,
  UPDATE_LOADING,
  LOGINANON,
  ADD_TASK,
  DELETE_TASKS,
  REMOVE_TASK
} from '../actions/user';

const user = (state = { }, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGINANON:
      return action.payload;
    case SIGNUP:
      return action.payload;
    case UPDATE_EMAIL:
      return { ...state, email: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    case UPDATE_USERNAME:
      return { ...state, username: action.payload };
    case UPDATE_LOADING:
      return { ...state, loading: action.payload };
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case DELETE_TASKS:
      return { ...state, tasks: [] };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.id !== action.payload
        )
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
