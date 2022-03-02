import { IInputProps, Input } from 'native-base';
import React from 'react';

interface PrimaryInputProps extends IInputProps {
  isHiddenPassword?: boolean;
  onPressHiddenPassword?: () => void;
}

export const PrimaryInput = ({
  value,
  placeholder,
  isHiddenPassword,
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
    type={isHiddenPassword ? 'text' : 'password'}
    placeholder={placeholder}
    InputRightElement={InputRightElement}
    value={value}
    onBlur={onBlur}
    onChangeText={onChangeText}
    {...props}
  />
);
