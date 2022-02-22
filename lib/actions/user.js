/* eslint-disable no-alert */
/* eslint-disable operator-linebreak */
import Firebase from "../database/connection";
import tasks from "../data/Goals";
// define types

export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const UPDATE_USERNAME = "UPDATE_USERNAME";
export const UPDATE_LOADING = "UPDATE_LOADING";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SIGNUP = "SIGNUP";
export const LOGINANON = "LOGINANON";
export const ADD_TASK = "ADDTASK";
export const DELETE_TASKS = "DELETE_TASKS";
export const REMOVE_TASK = "REMOVE_TASK";
export const CONTINUE_TASK = "CONTINUE_TASK";
export const CHANGE_CUANTIFICATION = "CHANGE_CUANTIFICATION";
export const OMIT_DAYS_TASKS = "OMIT_DAYS_TASKS";
export const DELETE_COMPLETED_TASKS = "DELETE_COMPLETED_TASKS";
export const INITIALIZE_TASK = "INITIALIZE_TASK";

export const updateEmail = (email) => {
  return {
    type: UPDATE_EMAIL,
    payload: email,
  };
};

export const updatePassword = (password) => {
  return {
    type: UPDATE_PASSWORD,
    payload: password,
  };
};

export const updateUsername = (username) => {
  return {
    type: UPDATE_USERNAME,
    payload: username,
  };
};

export const updateLoading = (loading) => {
  return {
    type: UPDATE_LOADING,
    payload: loading,
  };
};

export const removeTask = (id) => {
  return {
    type: REMOVE_TASK,
    payload: id,
  };
};

export const addTask = (task) => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

export const deleteTasks = () => {
  return {
    type: DELETE_TASKS,
  };
};

export const continueTask = (ID, YEAR, MONTH, DATE) => {
  return {
    type: CONTINUE_TASK,
    payload: {
      id: ID,
      year: YEAR,
      month: MONTH,
      date: DATE,
    },
  };
};

export const changeCuantification = (ID, QUANTITY, YEAR, MONTH, DATE) => {
  return {
    type: CHANGE_CUANTIFICATION,
    payload: {
      id: ID,
      year: YEAR,
      month: MONTH,
      date: DATE,
      quantity: QUANTITY,
    },
  };
};

export const omitDaysTasks = (YEAR, MONTH, DATE) => {
  return {
    type: OMIT_DAYS_TASKS,
    payload: {
      year: YEAR,
      month: MONTH,
      date: DATE,
    },
  };
};

export const deleteCompletedTasks = () => {
  return {
    type: DELETE_COMPLETED_TASKS,
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password
      );
      dispatch({ type: LOGIN, payload: { uid: response.user.uid } });
    } catch (e) {
      const errorCode = e.code;

      if (errorCode === "auth/wrong-password") {
        alert("Contraseña incorrecta.");
      } else if (errorCode === "auth/user-not-found") {
        alert("Usuario no registrado");
      } else if (errorCode === "auth/user-disabled") {
        alert("Tu cuenta ha sido deshabilitada");
      } else if (
        errorCode === "auth/invalid-email" ||
        errorCode === "auth/argument-error"
      ) {
        alert(
          "Ingresa un correo electrónico con el siguiente formato:\nalguien@ejemplo.com"
        );
      } else {
        alert("Algo salió mal. Intenta de nuevo. :(");
      }
    }
  };
};

export const loginAnon = () => {
  return async (dispatch) => {
    try {
      const response = await Firebase.auth().signInAnonymously();
      dispatch({ type: LOGINANON, payload: { uid: response.user.uid } });
    } catch (e) {
      const errorCode = e.code;

      if (errorCode === "auth/wrong-password") {
        alert("Contraseña incorrecta.");
      } else if (errorCode === "auth/user-not-found") {
        alert("Usuario no registrado");
      } else if (errorCode === "auth/user-disabled") {
        alert("Tu cuenta ha sido deshabilitada");
      } else if (
        errorCode === "auth/invalid-email" ||
        errorCode === "auth/argument-error"
      ) {
        alert(
          "Ingresa un correo electrónico con el siguiente formato:\nalguien@ejemplo.com"
        );
      } else {
        alert("Algo salió mal. Intenta de nuevo. :(");
      }
    }
  };
};

export const getUser = (uid) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN, payload: { uid } });
    } catch (e) {
      alert(e);
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT, payload: undefined });
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      );
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          email,
          loading: false,
        };

        dispatch({ type: SIGNUP, payload: user });
      }
    } catch (e) {
      alert(e);
    }
  };
};

export const initializeTask = () => {
  return {
    type: INITIALIZE_TASK,
  };
};
