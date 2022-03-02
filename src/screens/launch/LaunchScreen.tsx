import React, { FC, useEffect } from 'react';
import { Text, Center, Image, Flex } from 'native-base';
import { appLocalSettings } from 'shared';
import { resetWithScreen } from 'navigators/navigation-utilities';
import { ScreenName } from 'consts';

export const LaunchScreen: FC = () => {
  const loadLocalData = async () => {
    await Promise.all([appLocalSettings.load]);

    if (!appLocalSettings.didShowOnboarding) {
      resetWithScreen(ScreenName.Home);
    }
  };

  useEffect(() => {
    loadLocalData();
  }, []);

  return (
    <Center flex={1}>
      <Image
        width={20}
        height={20}
        source={require('assets/images/insta-logo.png')}
        alt="Instagram Logo"
      />

      <Flex
        direction="column"
        alignItems={'center'}
        position="absolute"
        bottom={10}
      >
        <Text
          alignContent={'center'}
          _light={{
            color: 'light.text.secondary',
          }}
          _dark={{
            color: 'dark.text.secondary',
          }}
        >
          from
        </Text>
        <Image
          width={24}
          height={6}
          source={require('assets/images/meta-logo.png')}
          alt="Instagram Logo"
        />
      </Flex>
    </Center>
  );
};
