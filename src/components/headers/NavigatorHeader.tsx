import { IconButton } from '../buttons/IconButton';
import { Box, IBoxProps, Text } from 'native-base';
import React from 'react';

interface INavigatorHeaderProps extends IBoxProps {
  isBackVisible?: boolean;
  title?: string;
  onPressLeftButton?: () => void;
}

export const NavigatorHeader = ({
  isBackVisible = true,
  title = '',
  onPressLeftButton,
  ...props
}: INavigatorHeaderProps) => {
  return (
    <Box style={[{ height: 60 }, props.style]}>
      <Box
        mx={2}
        flex={1}
        flexDir="row"
        alignItems="center"
        justifyContent={'flex-start'}
      >
        <IconButton
          opacity={isBackVisible ? 100 : 0}
          iconName="chevron-left"
          onPress={onPressLeftButton}
        />
        <Box flex={1}>
          <Text ml={1} fontSize="lg" fontWeight={'bold'} textAlign="center">
            {title}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
