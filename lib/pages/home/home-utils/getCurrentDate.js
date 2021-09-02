const DAY = 'day';
const WEEK = 'week';

const getCurrentDate = (cuantification, today, initialDate) => {
  if (cuantification === DAY) {
    return [today.getFullYear(), today.getMonth(), today.getDate()];
  }
  const currentDate = new Date(initialDate.getTime());
  const diff = today - initialDate;
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (cuantification === WEEK) {
    const startWeek = diffDays - (diffDays % 7);
    currentDate.setDate(currentDate.getDate() + startWeek);
    return [currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()];
  }

  const startMonth = diffDays - (diffDays % 30);
  currentDate.setDate(currentDate.getDate() + startMonth);
  return [currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()];

};

export default getCurrentDate;
