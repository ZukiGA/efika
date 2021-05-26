import { calculateDays } from './calculateDays';

const TIME = 'time';
const DAY = 'day';
const REPEAT = 'repeat';
const NONE = 'none';
const ERROR = 'error';
const BASE10 = 10;
const MAXIMUM_NAME_LENGTH = 3;

const createTask = (state) => {
  let daysToDo;
  let cuantification;
  let quantityCuantification;
  let days;

  try {
    const { nameTask } = state;
    const label = state.elemChips.find((elem) => elem.status === true);
    const { timesToDo } = state;
    parseInt(timesToDo, BASE10);

    if (nameTask.length === 0) throw new Error('No pusiste un nombre');
    if (nameTask.length < MAXIMUM_NAME_LENGTH) throw new Error('Los nombre deben tener minimo 3 letras');
    if (!label) throw new Error('No escogiste categoría');
    const { mainColor, brighterColor, darkerColor } = label;
    const categoryName = label.key;
    if (timesToDo === 0) throw new Error('No has escogido veces');
    let repetition = state.elemRepetition.find((elem) => elem.status === true);
    if (repetition === undefined) throw new Error('No escogiste cuanto vas a repetir tu hábito');
    repetition = repetition.key;
    if (repetition === DAY) {
      days = state.days.filter((elem) => elem.status === true);
      days = days.map((elem) => elem.num);
      if (days.length === 0) throw new Error('No escogiste ningun día');
      daysToDo = calculateDays(days, timesToDo);
    }
    if (state.elemCuantification[0].status === true) {
      cuantification = TIME;
      const minutes = state.time[0];
      parseInt(minutes, BASE10);
      const seconds = state.time[1];
      parseInt(seconds, BASE10);
      quantityCuantification = [minutes, seconds];
    }
    if (state.elemCuantification[1].status === true) {
      cuantification = REPEAT;
      quantityCuantification = state.repeat;
    }

    const task = {
      nameTask,
      timesToDo,
      categoryName,
      mainColor,
      brighterColor,
      darkerColor,
      repetition,
      completedTimes: 0,
    };

    if (task.repetition === DAY) {
      task.days = days;
      task.daysToDo = daysToDo;
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
