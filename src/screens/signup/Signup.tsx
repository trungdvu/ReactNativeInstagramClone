import React, { useState } from 'react';
import { Heading, Pressable, Text, useColorMode, VStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { LinkButton, NavigatorHeader, PrimaryButton, PrimaryInput } from 'components';
import { SignupViewModel } from './signup-view-model';
import { resetWithScreen } from 'navigators/navigation-utilities';
import { ScreenName } from 'consts';
import { authViewModel } from 'view-models/auth-view-model';

export const SignupScreen = observer(() => {
  const [isHiddenPaassword, setIsHiddenPassword] = useState(true);
  const [viewModel] = useState(new SignupViewModel());

  const { colorMode } = useColorMode();

  const toggleHiddenPassword = () => {
    setIsHiddenPassword((pre) => !pre);
  };

  const onPressCompleteSignup = () => {
    authViewModel.doSignup({
      email: viewModel.email,
      password: viewModel.password,
    });
  };

  const onPressAddNewPhone = () => {
    console.log('onPress add new phone or email');
  };

  const renderStep1 = () => {
    return (
      <React.Fragment>
        <Heading size={'xl'} fontWeight="normal">
          Enter your email
        </Heading>
        <Text fontSize={'md'} color="light.text.secondary">
          You can always change it later.
        </Text>
        <PrimaryInput
          width={'full'}
          autoFocus={true}
          isHiddenPassword={false}
          value={viewModel.email}
          placeholder="Email"
          onChangeText={(value) => viewModel.onChangeEmail(value)}
        />
        <PrimaryButton
          title="Next"
          width={'full'}
          size={12}
          onPress={() => viewModel.nextStep()}
          _text={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
        />

        <Pressable
          size={12}
          width={'full'}
          alignItems="center"
          justifyContent="center"
          onPress={() => resetWithScreen(ScreenName.Login)}
        >
          <Text _light={{ color: 'light.text.secondary' }} _dark={{ color: 'dark.text.secondary' }}>
            Already have an acoount?{' '}
            <Text
              bold
              color={colorMode === 'dark' ? 'dark.button.primary' : 'light.button.primary'}
            >
              Log in now.
            </Text>
          </Text>
        </Pressable>
      </React.Fragment>
    );
  };

  const renderStep2 = () => {
    return (
      <React.Fragment>
        <Heading size={'xl'} fontWeight="normal">
          Create a passoword
        </Heading>
        <Text fontSize={'md'} color="light.text.secondary" paddingX={8} textAlign="center">
          For sercurity your password must be 6 characters or more.
        </Text>
        <PrimaryInput
          width={'full'}
          placeholder="Password"
          autoFocus={true}
          value={viewModel.password}
          isHiddenPassword={isHiddenPaassword}
          onChangeText={(value) => viewModel.onChangePassword(value)}
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
        <PrimaryButton
          title="Next"
          width={'full'}
          size={12}
          onPress={() => viewModel.nextStep()}
          _text={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
        />
      </React.Fragment>
    );
  };

  const renderStep3 = () => {
    return (
      <VStack flex={1} space={3} paddingTop={20} justifyContent="space-between">
        <VStack space={3}>
          <Heading size={'xl'} fontWeight="normal" textAlign="center">
            {`Wellcome to Instagram, ${viewModel.email}`}
          </Heading>
          <Text fontSize={'md'} color="light.text.secondary" paddingX={6} textAlign="center">
            We'll add the email and phone number from blah blah. You can update this info anytime in
            Settings. or enter new info now.
          </Text>
          <PrimaryButton
            title="Complete sign up"
            width={'full'}
            size={12}
            marginTop={4}
            onPress={onPressCompleteSignup}
            _text={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
          />

          <LinkButton
            title="Add new phone or email"
            width={'full'}
            size={12}
            onPress={onPressAddNewPhone}
            _text={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
          />
        </VStack>

        <Text marginBottom={4} color="light.text.secondary" textAlign="center">
          {`We'll add private info from blah blah to ${viewModel.email}. See `}
          <Text bold color={'light.button.primary'}>
            Terms, Data Policy
          </Text>
          {' and '}
          <Text bold color={'light.button.primary'}>
            Cookies Policy
          </Text>
          {'.'}
        </Text>
      </VStack>
    );
  };

  const renderStep = () => {
    switch (viewModel.step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      default:
        return renderStep3();
    }
  };

  return (
    <VStack flex={1} safeAreaTop={10}>
      <NavigatorHeader
        isBackVisible={viewModel.step > 1}
        onPressLeftButton={() => viewModel.previousStep()}
      />
      <VStack flex={1} alignItems="center" space={3} paddingX={5}>
        {renderStep()}
      </VStack>
    </VStack>
  );
});
