/* eslint-disable no-unused-expressions */
const WEEK = 'week';

const calculateWeeksMonths = (timeToDo, cuantification, period) => {
  const today = new Date();
  let i = timeToDo;
  const daysGoal = {
    [today.getFullYear()]: {
      [today.getMonth()]: {
        [today.getDate()]: {
          status: 'today',
          ...(cuantification && { amount: 0 }) // conditionally add property
        },
      },
    }
  };

  period === WEEK
    ? today.setDate(today.getDate() + 7)
    : today.setDate(today.getDate() + 30);

  while (i > 1) {
    const [year, month, date] = [today.getFullYear(), today.getMonth(), today.getDate()];
    if (!daysGoal[year]) daysGoal[year] = {};
    if (!daysGoal[year][month]) daysGoal[year][month] = {};
    daysGoal[year][month][date] = {
      status: 'next',
      ...(cuantification && { amount: 0 })
    };
    i -= 1;
    period === WEEK
      ? today.setDate(today.getDate() + 7)
      : today.setDate(today.getDate() + 30);
  }

  return daysGoal;
};

export default calculateWeeksMonths;
