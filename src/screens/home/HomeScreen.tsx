import React, { FC } from 'react';
import { Center } from 'native-base';
import {
  LinkButton,
  PrimaryButton,
  SecondaryButton,
  IconButton,
} from 'components';

export const HomeScreen: FC = () => {
  return (
    <Center flex={1}>
      <PrimaryButton title="Follow" />
      <SecondaryButton marginTop={1} title="Follow" />
      <LinkButton marginTop={1} title="Follow" />
      <IconButton iconName="ambulance" />
    </Center>
  );
};
