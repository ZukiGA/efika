// eslint-disable-next-line import/no-extraneous-dependencies
import { FontAwesome5, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

const AddIconTask = (props) => {
  switch (props.task) {
    case 'Trabajo':
      return <MaterialIcons name="work" size={90} />;
    case 'Deportes':
      return <FontAwesome5 name="running" size={90} />;
    case 'Salud':
      return <AntDesign name="hearto" size={90} />;
    case 'Cultura':
      return <AntDesign name="book" size={90} />;
    case 'Finanzas':
      return <MaterialCommunityIcons name="finance" size={90} />;
    case 'Higiene':
      return <MaterialIcons name="clean-hands" size={90} />;
    default:
      return null;
  }
};

export default AddIconTask;
