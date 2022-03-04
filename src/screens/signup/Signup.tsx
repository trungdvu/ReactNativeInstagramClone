import React, { useEffect, useRef, useState } from 'react';
import { Heading, Pressable, Spinner, Text, useColorMode, VStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Observer, observer } from 'mobx-react-lite';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import validator from 'validator';
import { LinkButton, NavigatorHeader, PrimaryButton, PrimaryInput } from 'components';
import { resetWithScreen } from 'navigators/navigation-utilities';
import { ScreenName } from 'consts';
import { authViewModel } from 'view-models';
import { SignupViewModel } from './signup-view-model';
import _ from 'lodash';

export const SignupScreen = observer(() => {
  const [isHiddenPaassword, setIsHiddenPassword] = useState(true);
  const [viewModel] = useState(new SignupViewModel());
  const subject = useRef(new BehaviorSubject('')).current;

  const { colorMode } = useColorMode();

  useEffect(() => {
    authViewModel.setError(null);

    subject.pipe(distinctUntilChanged(), debounceTime(250)).subscribe((text) => {
      if (validator.isEmail(text)) {
        authViewModel.checkAccountExisted(text);
      }
    });

    return () => {
      subject.unsubscribe();
    };
  }, []);

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

  const onPressNext = () => {
    if (viewModel.step === 1 && validator.isEmail(viewModel.email)) {
      viewModel.nextStep();
    } else if (viewModel.step === 2 && viewModel.email.length > 6) {
      viewModel.nextStep();
    }
  };

  const onChangeTextEmail = (text: string, forceTrigger = false) => {
    viewModel.onChangeEmail(text);

    if (forceTrigger) {
      authViewModel.checkAccountExisted(text);
    } else if (_.isFunction(subject.next)) {
      subject.next(text);
    }
  };

  const renderSpinnerCheckingAccountExistd = () => {
    return (
      <Observer>
        {() => {
          const { loadingCheckAccountExisted } = authViewModel;
          return (
            <Spinner
              opacity={loadingCheckAccountExisted ? 100 : 0}
              hidesWhenStopped={true}
              style={{
                margin: 10,
                padding: 1,
              }}
            />
          );
        }}
      </Observer>
    );
  };

  const renderError = () => {
    return (
      <Observer>
        {() => {
          const { error } = authViewModel;
          if (!error?.errorCode) {
            return <React.Fragment />;
          } else {
            return (
              <Text color={'light.info.error'} textAlign="left" width={'full'}>
                {`*${error?.data}`}
              </Text>
            );
          }
        }}
      </Observer>
    );
  };

  const isDisabledButtonNextStep1 = () => {
    if (!validator.isEmail(viewModel.email) || authViewModel.error?.errorCode) {
      return true;
    }
    return false;
  };

  const Step1 = observer(() => {
    return (
      <VStack width={'full'} space={3}>
        <Heading size={'xl'} fontWeight="normal" textAlign={'center'}>
          Enter your email
        </Heading>
        <Text fontSize={'md'} color="light.text.secondary" textAlign={'center'}>
          You can always change it later.
        </Text>
        <PrimaryInput
          width={'full'}
          autoFocus={true}
          isHiddenPassword={false}
          returnKeyType="go"
          onSubmitEditing={onPressNext}
          value={viewModel.email}
          placeholder="Email"
          onChangeText={onChangeTextEmail}
          InputRightElement={renderSpinnerCheckingAccountExistd()}
        />

        {renderError()}

        <PrimaryButton
          title="Next"
          width={'full'}
          size={12}
          onPress={onPressNext}
          disabled={isDisabledButtonNextStep1()}
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
      </VStack>
    );
  });

  const Step2 = observer(() => {
    return (
      <VStack width="full" space={3}>
        <Heading size={'xl'} fontWeight="normal" textAlign={'center'}>
          Create a passoword
        </Heading>
        <Text fontSize={'md'} color="light.text.secondary" paddingX={8} textAlign="center">
          For sercurity your password must be 6 characters or more.
        </Text>
        <PrimaryInput
          width={'full'}
          placeholder="Password"
          autoFocus={true}
          returnKeyType="go"
          value={viewModel.password}
          isHiddenPassword={isHiddenPaassword}
          onSubmitEditing={onPressNext}
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
          disabled={!Boolean(viewModel.password.length >= 6)}
          onPress={onPressNext}
          _text={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
        />
      </VStack>
    );
  });

  const Step3 = observer(() => {
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
            isLoading={authViewModel.loadingSignup}
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
  });

  const renderStep = () => {
    switch (viewModel.step) {
      case 1:
        return <Step1 key={1} />;
      case 2:
        return <Step2 key={2} />;
      default:
        return <Step3 key={3} />;
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
