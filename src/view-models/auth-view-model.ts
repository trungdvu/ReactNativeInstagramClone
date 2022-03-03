import _ from 'lodash';
import { makeAutoObservable } from 'mobx';
import { UserModel } from 'models';
import { AuthService } from 'services';

export class AuthViewModel {
  private static instance: AuthViewModel;
  private service = new AuthService();

  loadingLogin = false;
  loadingSignup = false;
  loadingLogout = false;
  currentUser: UserModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public static sharedInstance(): AuthViewModel {
    if (!AuthViewModel.instance) {
      AuthViewModel.instance = new AuthViewModel();
    }

    return AuthViewModel.instance;
  }

  setCurrentUser(user: UserModel) {
    this.currentUser = user;
  }

  *doLogin(payload) {
    this.loadingLogin = true;

    const response = yield this.service.doLogin(payload);
    const { errorCode, data } = response;

    if (_.isEmpty(errorCode)) {
      console.log('Hello ERROR!');
    } else {
      const user = new UserModel(data);
      this.currentUser = user;
    }

    this.loadingLogin = false;
  }
}

export const authViewModel = AuthViewModel.sharedInstance();
