import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies

const selectGoalColor = (color) => {
  switch (color) {
    case 'completed':
      return "#00FF00"
    case 'today':
      return "#7DF9FF"
    case 'next':
      return "#FF5733"
    case 'invalid':
      return "#DADADA";
    default:
      return "#DADADA";
  }
};
export default selectGoalColor;
