import React from 'react';
import { IInputProps, Input } from 'native-base';

interface PrimaryInputProps extends IInputProps {
  isHiddenPassword?: boolean;
  onPressHiddenPassword?: () => void;
}

export const PrimaryInput = ({
  value,
  placeholder,
  isHiddenPassword = false,
  InputRightElement,
  onBlur,
  onChangeText,
  onPressHiddenPassword,
  ...props
}: PrimaryInputProps) => (
  <Input
    size={'lg'}
    variant={'filled'}
    backgroundColor={'black:alpha.5'}
    borderColor="light.border"
    type={isHiddenPassword ? 'password' : 'text'}
    placeholder={placeholder}
    InputRightElement={InputRightElement}
    value={value}
    autoCapitalize="none"
    onBlur={onBlur}
    onChangeText={onChangeText}
    {...props}
  />
);
