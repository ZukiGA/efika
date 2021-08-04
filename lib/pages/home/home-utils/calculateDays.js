const calculateDays = (myDays, timeToDo, cuantification) => {
  const today = new Date();
  const daysGoal = {
    [today.getFullYear()]: {
      [today.getMonth()]: {
        [today.getDate()]: myDays.includes(today.getDay()) ? {
          status: 'today',
          ...(cuantification && { amount: 0 }) // conditionally add property
        } : {
          status: 'none',
        },
      },
    }
  };

  let i = myDays.includes(today.getDay()) ? timeToDo - 1 : timeToDo;
  today.setDate(today.getDate() + 1);

  while (i > 0) {
    if (myDays.includes(today.getDay())) {
      if (typeof daysGoal[today.getFullYear()] === 'undefined') daysGoal[today.getFullYear()] = {};
      if (typeof daysGoal[today.getFullYear()][today.getMonth()] === 'undefined') daysGoal[today.getFullYear()][today.getMonth()] = {};
      daysGoal[today.getFullYear()][today.getMonth()][today.getDate()] = {
        status: 'next',
        ...(cuantification && { amount: 0 })
      };
      i -= 1;
    }
    today.setDate(today.getDate() + 1);
  }

  return daysGoal;
};

export default calculateDays;
