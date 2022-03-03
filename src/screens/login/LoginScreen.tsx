import React, { useState } from 'react';
import {
  Button,
  Divider,
  FormControl,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  useColorMode,
  VStack,
} from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { PrimaryButton, PrimaryInput } from 'components';
import { resetWithScreen } from 'navigators/navigation-utilities';
import { ScreenName } from 'consts';
import { authViewModel } from 'view-models/auth-view-model';

export const LoginScreen = () => {
  const [isHiddenPaassword, setIsHiddenPassword] = useState(true);
  const { colorMode } = useColorMode();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onPressLanguage = () => {
    console.log('onPress to choose language');
  };

  const onPressLogin = (data) => {
    authViewModel.doLogin(data);
  };

  const toggleHiddenPassword = () => {
    setIsHiddenPassword((pre) => !pre);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-between',
      }}
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}
    >
      <VStack alignItems="center" safeAreaTop={16}>
        <Button
          size="lg"
          variant="unstyled"
          padding={0}
          onPress={onPressLanguage}
          rightIcon={
            <FontAwesome
              name="chevron-down"
              color={colorMode === 'dark' ? '#B0B3B8' : '#8e8e8e'}
              size={10}
            />
          }
          _light={{
            _text: {
              color: 'light.text.secondary',
            },
          }}
          _dark={{
            _text: {
              color: 'dark.text.secondary',
            },
          }}
        >
          English (United State)
        </Button>

        <VStack paddingTop={32} space={3} paddingX={5} width={'full'} alignItems="center">
          <Image
            width={48}
            height={16}
            source={require('assets/images/insta-logo-2-light.png')}
            alt="Instagram Logo"
          />

          <FormControl isInvalid={'email' in errors}>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Please enter your email!' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <PrimaryInput
                  value={value}
                  placeholder="Email"
                  onChangeText={(value) => onChange(value)}
                  onBlur={onBlur}
                />
              )}
            />
            <FormControl.ErrorMessage>{errors.email?.message}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={'password' in errors}>
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Password is required!' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <PrimaryInput
                  value={value}
                  placeholder="Password"
                  isHiddenPassword={isHiddenPaassword}
                  onChangeText={(value) => onChange(value)}
                  onBlur={onBlur}
                  InputRightElement={
                    <FontAwesome
                      style={{
                        margin: 10,
                        padding: 1,
                      }}
                      size={20}
                      name={isHiddenPaassword ? 'eye-slash' : 'eye'}
                      onPress={toggleHiddenPassword}
                    />
                  }
                />
              )}
            />
            <FormControl.ErrorMessage>{errors.password?.message}</FormControl.ErrorMessage>
          </FormControl>

          <PrimaryButton
            title="Log in"
            width={'full'}
            size={12}
            onPress={handleSubmit(onPressLogin)}
            _text={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
          />

          <Pressable size={8} width={'full'} alignItems="center" justifyContent="center">
            <Text
              _light={{ color: 'light.text.secondary' }}
              _dark={{ color: 'dark.text.secondary' }}
            >
              Forgot your login details?{' '}
              <Text
                bold
                color={colorMode === 'dark' ? 'dark.button.primary' : 'light.button.primary'}
              >
                Get help logging in.
              </Text>
            </Text>
          </Pressable>

          <HStack justifyContent="center" alignItems="center">
            <Divider width={'1/3'} thickness={1} background="dark.border" />
            <Text
              marginX={2}
              bold
              _light={{
                color: 'light.text.secondary',
              }}
              _dark={{
                color: 'dark.text.secondary',
              }}
            >
              OR
            </Text>
            <Divider width={'1/3'} background="dark.border" />
          </HStack>

          <PrimaryButton
            title="Continue with Facebook"
            width={'full'}
            size={12}
            leftIcon={<FontAwesome size={20} name="facebook" color="white" />}
            _text={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
          />
        </VStack>
      </VStack>

      <Pressable
        size={12}
        width={'full'}
        borderTopWidth={1}
        borderTopColor={colorMode === 'dark' ? 'dark.border' : 'light.border'}
        alignItems="center"
        justifyContent="center"
        onPress={() => resetWithScreen(ScreenName.Signup)}
      >
        <Text _light={{ color: 'light.text.secondary' }} _dark={{ color: 'dark.text.secondary' }}>
          Don’t have an account?{' '}
          <Text bold color={colorMode === 'dark' ? 'dark.button.primary' : 'light.button.primary'}>
            Sign up.
          </Text>
        </Text>
      </Pressable>
    </ScrollView>
  );
};
