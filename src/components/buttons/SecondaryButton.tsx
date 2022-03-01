import React, { FC } from 'react';
import { Button, IButtonProps } from 'native-base';

interface ISecondaryButtonProps extends IButtonProps {
  title?: string;
}

export const SecondaryButton: FC<ISecondaryButtonProps> = ({
  title = 'Secondary Button',
  ...props
}) => {
  return (
    <Button
      variant="outline"
      opacity={props.disabled ? 40 : 100}
      _light={{
        _text: {
          color: 'light.text.primary',
        },
        borderColor: 'light.border',
        _pressed: {
          backgroundColor: 'transparent',
          borderColor: 'black:alpha.40',
        },
        _disabled: {
          borderColor: 'black',
        },
      }}
      _dark={{
        _text: {
          color: 'dark.text.primary',
        },
        borderColor: 'dark.border',
        _pressed: {
          backgroundColor: 'transparent',
          borderColor: 'black:alpha.40',
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
