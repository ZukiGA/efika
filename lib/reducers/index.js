import { combineReducers } from "redux";
import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_USERNAME,
  UPDATE_LOADING,
  LOGINANON,
  ADD_TASK,
  DELETE_TASKS,
  REMOVE_TASK,
  CONTINUE_TASK,
  CHANGE_CUANTIFICATION,
  OMIT_DAYS_TASKS,
  DELETE_COMPLETED_TASKS,
  INITIALIZE_TASK,
} from "../actions/user";
import omitDays from "./reducers-utils/omitDays";

const user = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };
    case LOGINANON:
      return { ...state, ...action.payload };
    case SIGNUP:
      return { ...state, ...action.payload };
    case LOGOUT:
      return { ...state, uid: action.payload };
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
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case CONTINUE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            task.completedTimes += 1;
            const today = new Date();
            today.setDate(today.getDate() + 1);
            task.currentDate = today;
            task.daysToDo[action.payload.year][action.payload.month][
              action.payload.date
            ].status = "completed";
            return task;
          }
          return task;
        }),
      };
    case CHANGE_CUANTIFICATION:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            const newTask = JSON.parse(JSON.stringify(task));
            if (
              task.daysToDo[action.payload.year][action.payload.month][
                action.payload.date
              ].amount +
                action.payload.quantity >=
              task.quantityCuantification
            ) {
              newTask.completedTimes += 1;
              newTask.daysToDo[action.payload.year][action.payload.month][
                action.payload.date
              ].status = "completed";
            }
            // eslint-disable-next-line max-len
            newTask.daysToDo[action.payload.year][action.payload.month][
              action.payload.date
            ].amount += action.payload.quantity;
            return newTask;
          }
          return task;
        }),
      };
    case OMIT_DAYS_TASKS:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          task.daysToDo = omitDays(
            task.daysToDo,
            new Date(task.currentDate),
            new Date(
              action.payload.year,
              action.payload.month,
              action.payload.date
            )
          );
          task.currentDate = new Date();
          return task;
        }),
      };
    case DELETE_COMPLETED_TASKS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => {
          return new Date(task.currentDate) <= new Date(task.finalDate);
        }),
      };
    case INITIALIZE_TASK:
      return {
        ...state,
        tasks: typeof tasks === "undefined" ? [] : tasks,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
