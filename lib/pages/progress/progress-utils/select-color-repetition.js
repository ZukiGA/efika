const selectColorRepetition = (type) => {
  switch (type) {
    case 'day':
      return 'green';
    case 'week':
      return 'orange';
    case 'month':
      return 'red';
    default:
      return 'black';
  }
};
export default selectColorRepetition;
