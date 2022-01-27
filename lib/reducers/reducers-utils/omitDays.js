const omitDays = (objectDays, currentDay, lastDay) => {
  const days = objectDays; // prone to change
  while (lastDay > currentDay) {
    // console.log(currentDay)
    const [year, month, date] = [currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate()];
    if (days[year] && days[year][month] && days[year][month][date] && days[year][month][date].status == 'next') {
      days[year][month][date].status = 'omitted';
    }
    currentDay.setDate(currentDay.getDate() + 1);
  }
  return days;
};

export default omitDays;
