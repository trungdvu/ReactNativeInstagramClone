import { CometChat } from '@cometchat-pro/react-native-chat';
import { cometChatConfig } from 'configs';
import { LoginPayload, SignupCometPayload, SignupPayload } from 'interfaces';
import _ from 'lodash';
import { makeAutoObservable } from 'mobx';
import { UserModel } from 'models';
import {
  AuthService,
  doCreateUserWithEmailAndPassword,
  doGetUserDocument,
  doSignInWithEmailAndPassword,
} from 'services';
import { authLocalStorage, logd, loge } from 'shared';

const TAG = 'AUTH_VIEW_MODEL';

export class AuthViewModel {
  private static instance: AuthViewModel;
  private service = new AuthService();

  loadingLogin = false;
  loadingSignup = false;
  loadingLogout = false;
  currentUser: UserModel | null = null;

  constructor() {
    makeAutoObservable(this);
    this.currentUser = authLocalStorage.auth;
  }

  public static sharedInstance(): AuthViewModel {
    if (!AuthViewModel.instance) {
      AuthViewModel.instance = new AuthViewModel();
    }

    return AuthViewModel.instance;
  }

  setCurrentUser(user: UserModel | null) {
    this.currentUser = user;
  }

  async doLogin(payload: LoginPayload) {
    try {
      this.loadingLogin = true;
      const user = await doSignInWithEmailAndPassword(payload);
      if (user) {
        await this.doLoginCometChat(user);
      }
    } catch (error) {
      this.loadingLogin = false;
      logd(TAG, `Your username or password maybe is not correct`);
    }
  }

  private async doLoginCometChat(authUser: UserModel) {
    try {
      this.loadingLogin = true;

      const user = await CometChat.login(authUser.uid, `${cometChatConfig.cometChatAuthKey}`);
      if (user) {
        this.setCurrentUser(authUser);
        console.log(this.currentUser);
        authLocalStorage.setAuth(authUser);
      }
    } catch (error: any) {
      logd(TAG, `Your username or password maybe is not correct`);
    } finally {
      this.loadingLogin = false;
    }
  }

  private async doCreateCometChatAccount({
    uid,
    email,
    displayName,
    photoURL,
  }: SignupCometPayload) {
    try {
      const user = new CometChat.User(uid);
      user.setName(displayName || email);
      user.setAvatar(photoURL || 'https://avatars.githubusercontent.com/u/61225238?v=4');

      const authKey = `${cometChatConfig.cometChatAuthKey}`;
      const cometChatUser = await CometChat.createUser(user, authKey);

      return cometChatUser;
    } catch (error: any) {
      loge(TAG, 'Fail to create your CometChat user, please try again');
    } finally {
      this.loadingLogin = false;
      return;
    }
  }

  async doCreateAccountWithEmailAndPassword(payload: SignupPayload) {
    try {
      this.loadingSignup = true;
      const user = await doCreateUserWithEmailAndPassword(payload);
      if (user) {
        await this.doCreateCometChatAccount(user);
        await this.doLogin(payload);
      }
    } catch (error) {
      loge(TAG, 'Fail to create your account, your account might be existed');
    } finally {
      this.loadingSignup = false;
    }
  }
}

export const authViewModel = AuthViewModel.sharedInstance();
