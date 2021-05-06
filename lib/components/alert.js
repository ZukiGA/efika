/* eslint-disable react-native/no-raw-text */
import React from 'react';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import { Button, Dialog, Paragraph } from 'react-native-paper';

const Alert = ({
  visibleAlert,
  hideDialog,
  message,
  accept,
  noActive,
  noMessage,
  yesMessage,
}) => {
  return (
    <Overlay isVisible={visibleAlert} onBackdropPress={hideDialog}>
      <Dialog.Title>Alert</Dialog.Title>
      <Dialog.Content>
        <Paragraph>{message}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        {noActive ? <Button onPress={hideDialog}>{noMessage}</Button> : null}

        <Button onPress={accept}>{yesMessage}</Button>
      </Dialog.Actions>
    </Overlay>
  );
};

export default Alert;
