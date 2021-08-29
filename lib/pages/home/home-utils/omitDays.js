const omitDays = (objectDays, currentDay, lastDay) => {
  const days = JSON.parse(JSON.stringify(objectDays)); // prone to change
  while (lastDay > currentDay) {
    if (days[currentDay.getFullYear()]
&& days[currentDay.getFullYear()][currentDay.getMonth()]
&& days[currentDay.getFullYear()][currentDay.getMonth()][currentDay.getDate()]) {
      days[currentDay.getFullYear()][currentDay.getMonth()][currentDay.getDate()] = 'ommited';
    }
    currentDay.setDate(currentDay.getDate() + 1);
  }
  return days;
};

const daysToDo = {
  2021: {
    5: {
      23: 'today',
      27: 'next'
    },
    6: {
      3: 'next',
    }
  }
};

const today = new Date();
const nextDay = new Date();
nextDay.setDate(nextDay.getDate() + 30);
console.log(omitDays(daysToDo, today, nextDay));
console.log(daysToDo);
