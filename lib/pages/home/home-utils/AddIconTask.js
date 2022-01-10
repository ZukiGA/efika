// eslint-disable-next-line import/no-extraneous-dependencies
import {
  MaterialIcons, AntDesign, MaterialCommunityIcons
} from '@expo/vector-icons';
import React from 'react';

const AddIconTask = (props) => {
  switch (props.task) {
    case 'Work':
      return <MaterialIcons name="work" size={90} />;
    case 'Sports':
      return <MaterialCommunityIcons name="run" size={90} />;
    case 'Health':
      return <AntDesign name="hearto" size={90} />;
    case 'Culture':
      return <AntDesign name="book" size={90} />;
    case 'Finance':
      return <MaterialCommunityIcons name="finance" size={90} />;
    case 'Hygiene':
      return <MaterialIcons name="clean-hands" size={90} />;
    default:
      return null;
  }
};

export default AddIconTask;
