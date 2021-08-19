import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  MaterialIcons, AntDesign, MaterialCommunityIcons
} from '@expo/vector-icons';

const selectGoalIcon = (category, color) => {
  switch (category) {
    case 'Trabajo':
      return <MaterialIcons name="work" size={40} color={color} />;
    case 'Deportes':
      return <MaterialCommunityIcons name="run" size={40} color={color} />;
    case 'Salud':
      return <AntDesign name="hearto" size={40} color={color} />;
    case 'Cultura':
      return <AntDesign name="book" size={40} color={color} />;
    case 'Finanzas':
      return <MaterialCommunityIcons name="finance" size={40} color={color} />;
    case 'Higiene':
      return <MaterialIcons name="clean-hands" size={40} color={color} />;
    default:
      return null;
  }
};
export default selectGoalIcon;
