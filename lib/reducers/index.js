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
  REMOVE_TASK,
  CONTINUE_TASK
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
    case CONTINUE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(
          (task) => {
            if (task.id === action.payload.id) {
              const newTask = JSON.parse(JSON.stringify(task));
              newTask.completedTimes += 1;
              newTask.daysToDo[action.payload.year][action.payload.month][action.payload.date].status = 'completed';
              return newTask;
            }
            return task;
          }
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
