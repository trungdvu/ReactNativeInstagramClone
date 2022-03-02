import React, { useState } from 'react';
import { Heading, Text, VStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { LinkButton, PrimaryButton, PrimaryInput } from 'components';
import { SignupViewModel } from './signup-view-model';

export const SignupScreen = observer(() => {
  const [isHiddenPaassword, setIsHiddenPassword] = useState(false);
  const [viewModel] = useState(new SignupViewModel());

  const toggleHiddenPassword = () => {
    setIsHiddenPassword((pre) => !pre);
  };

  const onPressCompleteSignup = () => {
    console.log('onPress complete sign up');
    console.log(viewModel.username);
    console.log(viewModel.password);
  };

  const onPressAddNewPhone = () => {
    console.log('onPress add new phone or email');
  };

  const renderStep1 = () => {
    return (
      <React.Fragment>
        <Heading size={'xl'} fontWeight="normal">
          Choose username
        </Heading>
        <Text fontSize={'md'} color="light.text.secondary">
          You can always change it later.
        </Text>
        <PrimaryInput
          width={'full'}
          value={viewModel.username}
          placeholder="Username"
          onChangeText={(value) => viewModel.onChangeUsername(value)}
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

  const renderStep2 = () => {
    return (
      <React.Fragment>
        <Heading size={'xl'} fontWeight="normal">
          Create a passoword
        </Heading>
        <Text
          fontSize={'md'}
          color="light.text.secondary"
          paddingX={8}
          textAlign="center"
        >
          For sercurity your password must be 6 characters or more.
        </Text>
        <PrimaryInput
          width={'full'}
          value={viewModel.password}
          placeholder="Password"
          isHiddenPassword={isHiddenPaassword}
          onChangeText={(value) => viewModel.onChangePassword(value)}
          InputRightElement={
            <FontAwesome
              style={{
                margin: 10,
                padding: 1,
              }}
              size={20}
              name={isHiddenPaassword ? 'eye' : 'eye-slash'}
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
      <VStack flex={1} space={3} paddingTop={32} justifyContent="space-between">
        <VStack space={3}>
          <Heading size={'xl'} fontWeight="normal" textAlign="center">
            {`Wellcome to Instagram, ${viewModel.username}`}
          </Heading>
          <Text
            fontSize={'md'}
            color="light.text.secondary"
            paddingX={6}
            textAlign="center"
          >
            We'll add the email and phone number from blah blah. You can update
            this info anytime in Settings. or enter new info now.
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
          {`We'll add private info from blah blah to ${viewModel.username}. See `}
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
    <VStack
      flex={1}
      alignItems="center"
      safeAreaTop={16}
      space={3}
      paddingX={5}
    >
      {renderStep()}
    </VStack>
  );
});
