import React, { FC } from 'react';
import { Center, useColorMode } from 'native-base';
import { LinkButton, PrimaryButton, SecondaryButton, IconButton } from 'components';
import { authViewModel } from 'view-models';

export const HomeScreen: FC = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Center flex={1}>
      <PrimaryButton title="Change color" onPress={toggleColorMode} />
      <SecondaryButton marginTop={1} title="Follow" />
      <LinkButton marginTop={1} title="Follow" />
      <IconButton iconName="ambulance" />
      <PrimaryButton title="Sign out" onPress={() => authViewModel.doLogout()} />
    </Center>
  );
};
