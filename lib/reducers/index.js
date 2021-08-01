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
  DELETE_TASKS
} from '../actions/user';

const initialState = {
  brighterColor: '#9DB8DD',
  categoryName: 'General',
  completedTimes: 0,
  cuantification: 'none',
  darkerColor: '#0154C1',
  days: [
    1,
    2,
    3,
    4,
    5
  ],
  daysToDo: { },
  id: 'General',
  mainColor: 'black',
  nameTask: 'Progreso general',
  repetition: 'day',
  timesToDo: 100,
};

const user = (state = { tasks: initialState }, action) => {
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
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
