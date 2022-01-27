import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  MaterialIcons, AntDesign, MaterialCommunityIcons
} from '@expo/vector-icons';

const selectGoalIcon = (category, color) => {
  switch (category) {
    case 'Work':
      return <MaterialIcons name="work" size={40} color={color} />;
    case 'Sports':
      return <MaterialCommunityIcons name="run" size={40} color={color} />;
    case 'Health':
      return <AntDesign name="hearto" size={40} color={color} />;
    case 'Culture':
      return <AntDesign name="book" size={40} color={color} />;
    case 'Finance':
      return <MaterialCommunityIcons name="finance" size={40} color={color} />;
    case 'Hygiene':
      return <MaterialIcons name="clean-hands" size={40} color={color} />;
    default:
      return null;
  }
};
export default selectGoalIcon;
