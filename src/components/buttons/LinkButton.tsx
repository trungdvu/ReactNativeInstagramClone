import { Button, IButtonProps } from 'native-base';
import React, { FC } from 'react';

interface ILinkButtonProps extends IButtonProps {
  title?: string;
}

export const LinkButton: FC<ILinkButtonProps> = ({ title = 'Link Button', ...props }) => {
  return (
    <Button
      variant="link"
      opacity={props.disabled ? 50 : 100}
      _light={{
        _text: {
          color: 'light.button.primary',
        },
        _pressed: {
          _text: {
            color: 'light.button.pressed',
          },
        },
      }}
      _dark={{
        _text: {
          color: 'dark.button.primary',
        },
        _pressed: {
          _text: {
            color: 'dark.button.pressed',
          },
        },
      }}
      _text={{
        fontWeight: 'bold',
      }}
      style={{
        paddingTop: 3,
        paddingBottom: 3,
      }}
      {...props}
    >
      {title}
    </Button>
  );
};
