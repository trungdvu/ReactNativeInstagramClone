import React, { FC } from 'react';
import { Button, IButtonProps } from 'native-base';

interface IPrimaryButtonProps extends IButtonProps {
  title?: string;
}

export const PrimaryButton: FC<IPrimaryButtonProps> = ({ title = 'Primary Button', ...props }) => {
  return (
    <Button
      opacity={props.disabled ? 50 : 100}
      _light={{
        backgroundColor: 'light.button.primary',
        _pressed: {
          backgroundColor: 'light.button.pressed',
        },
      }}
      _dark={{
        backgroundColor: 'dark.button.primary',
        _pressed: {
          backgroundColor: 'dark.button.pressed',
        },
      }}
      _text={{
        color: 'white',
        fontWeight: 'bold',
      }}
      style={{
        paddingTop: 3,
        paddingBottom: 3,
      }}
      _loading={{
        _text: {
          color: 'white',
        },
      }}
      {...props}
    >
      {title}
    </Button>
  );
};
