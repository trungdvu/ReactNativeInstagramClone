import { CometChat } from '@cometchat-pro/react-native-chat';
import { cometChatConfig } from 'configs';
import { LoginPayload, SignupCometPayload, SignupPayload } from 'interfaces';
import { ResponseModel, UserModel } from 'models';
import {
  auth,
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut,
} from 'services/firebase-service';
import { authLocalStorage, loge } from 'shared';

const TAG = 'AUTH_SERVICE';

export class AuthService {
  private async doLoginCometChat(authUser: UserModel): Promise<CometChat.User> {
    try {
      const authKey = `${cometChatConfig.cometChatAuthKey}`;

      const user = await CometChat.login(authUser.uid, authKey);

      return user;
    } catch (error: any) {
      loge(TAG, `Fail to login CometChat`);
      loge(TAG, `ERROR: ${error.message}`);
      throw error;
    }
  }

  private async doCreateCometChatAccount({
    uid,
    email,
    displayName,
    photoURL,
  }: SignupCometPayload): Promise<CometChat.User> {
    try {
      const userObj = new CometChat.User({
        uid,
        name: displayName || email,
        avatar: photoURL || 'https://avatars.githubusercontent.com/u/61225238?v=4',
      });
      const authKey = `${cometChatConfig.cometChatAuthKey}`;

      const cometChatUser = await CometChat.createUser(userObj, authKey);

      return cometChatUser;
    } catch (error: any) {
      loge(TAG, `Fail to create CometChat account!`);
      loge(TAG, `ERROR: ${error.message}`);
      throw error;
    }
  }

  async doLogin(payload: LoginPayload): Promise<ResponseModel> {
    try {
      const user = await doSignInWithEmailAndPassword(payload);
      await this.doLoginCometChat(user);

      authLocalStorage.setAuth(user);

      return {
        status: 0,
        data: user,
      };
    } catch (error: any) {
      return {
        data: 'Opps. Incorrect email or password!',
        errorCode: -999,
      };
    }
  }

  async doSignup(payload: SignupPayload): Promise<ResponseModel> {
    try {
      const user = await doCreateUserWithEmailAndPassword(payload);

      await this.doCreateCometChatAccount(user);

      return {
        status: 0,
        data: user,
      };
    } catch (error: any) {
      return {
        data: 'Opps. Your account might be existed!',
        errorCode: -999,
      };
    }
  }

  async doLogout(): Promise<ResponseModel> {
    try {
      await doSignOut(auth);
      await CometChat.logout();

      authLocalStorage.setAuth('');

      return {
        status: 0,
        data: 'Sign out successfully',
      };
    } catch (error: any) {
      console.error(error.message);
      return {
        status: 0,
        data: 'Fail to sign out, please try later!',
      };
    }
  }
}
