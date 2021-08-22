import calculateDays from './calculateDays';
import calculateWeeksMonths from './calculateWeeksMonths';

const TIME = 'time';
const DAY = 'day';
const REPEAT = 'repeat';
const NONE = 'none';
const ERROR = 'error';
const BASE10 = 10;
const MINIMUM_NAME_LENGTH = 3;
const WEEK = 'week';
const MONTH = 'month';
const TASK = 'task';

const createTask = (state) => {
  let daysToDo;
  let cuantification;
  let quantityCuantification;
  let days;

  try {
    const type = TASK;
    const { title } = state;
    const label = state.elemChips.find((elem) => elem.status === true);
    const { timesToDo } = state;
    parseInt(timesToDo, BASE10);

    if (title.length === 0) throw new Error('No pusiste un nombre');
    if (title.length < MINIMUM_NAME_LENGTH) throw new Error('Los nombre deben tener minimo 3 letras');

    if (!label) throw new Error('No escogiste categoría');

    const { mainColor, brighterColor, darkerColor } = label;
    const category = label.key;

    if (timesToDo === 0) throw new Error('No has escogido veces');
    let repetition = state.elemRepetition.find((elem) => elem.status === true);
    if (repetition === undefined) throw new Error('No escogiste cada cuanto vas a repetir tu hábito');
    repetition = repetition.key;
    if (repetition === DAY) {
      days = state.days.filter((elem) => elem.status === true);
      days = days.map((elem) => elem.num);
      if (days.length === 0) throw new Error('No escogiste ningun día');
    }

    if (state.elemCuantification[0].status === true) {
      cuantification = TIME;
      const minutes = parseInt(state.time[0], 10);
      const seconds = parseInt(state.time[1], 10);
      quantityCuantification = minutes * 60 + seconds;
    }
    if (state.elemCuantification[1].status === true) {
      cuantification = REPEAT;
      quantityCuantification = parseInt(state.repeat, 10);
    }

    // includes days and cuantification
    switch (repetition) {
      case WEEK:
        daysToDo = calculateWeeksMonths(timesToDo, cuantification, WEEK);
        break;
      case MONTH:
        daysToDo = calculateWeeksMonths(timesToDo, cuantification, MONTH);
        break;
      default:
        daysToDo = calculateDays(days, timesToDo, cuantification);
        break;
    }

    const today = new Date();
    const newLocal = today / (1000);
    const id = title + Math.round(newLocal);

    const task = {
      id,
      title,
      type,
      timesToDo,
      category,
      mainColor,
      brighterColor,
      darkerColor,
      repetition,
      completedTimes: 0,
      daysToDo
    };

    if (task.repetition === DAY) {
      task.days = days;
    }
    if (state.elemCuantification[0].status || state.elemCuantification[1].status) {
      task.cuantification = cuantification;
      task.quantityCuantification = quantityCuantification;
    } else {
      task.cuantification = NONE;
    }

    return task;
  } catch (e) {
    e.typeOfObject = ERROR;
    return e;
  }

};

export default createTask;
