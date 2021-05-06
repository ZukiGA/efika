import * as React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export default function FocusStatusBar() {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar style="auto" /> : null;
}
