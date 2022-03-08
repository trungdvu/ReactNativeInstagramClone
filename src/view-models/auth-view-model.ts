import { ScreenName } from 'consts';
import { LoginPayload, SignupPayload } from 'interfaces';
import { makeAutoObservable } from 'mobx';
import { ErrorModel, UserModel } from 'models';
import { resetWithScreen } from 'navigators/navigation-utilities';
import { AuthService } from 'services';
import { authLocalStorage } from 'shared';

export class AuthViewModel {
  private static instance: AuthViewModel;
  private service = new AuthService();

  loadingLogin = false;
  loadingSignup = false;
  loadingLogout = false;
  loadingCheckAccountExisted = false;
  currentUser: UserModel | null = null;
  error: ErrorModel | null = null;

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

  setError(error: ErrorModel | null) {
    this.error = error;
  }

  *doLogin(payload: LoginPayload) {
    this.loadingLogin = true;

    const response = yield this.service.doLogin(payload);

    const { data, errorCode } = response;
    if (errorCode) {
      this.error = {
        errorCode,
        data,
      };
    } else {
      this.currentUser = data;
      this.loadingLogin = false;
      resetWithScreen(ScreenName.Home);
    }

    this.loadingLogin = false;
  }

  *doSignup(payload: SignupPayload) {
    this.loadingSignup = true;

    const response = yield this.service.doSignup(payload);

    const { errorCode, data } = response;
    if (errorCode) {
      this.error = {
        errorCode,
        data,
      };
    } else {
      yield this.doLogin(payload);
    }

    this.loadingSignup = false;
  }

  *doLogout() {
    this.loadingLogout = true;

    const response = yield this.service.doLogout();
    const { errorCode, data } = response;
    if (errorCode) {
      this.error = {
        errorCode,
        data,
      };
    }

    this.loadingLogout = false;
  }

  *checkAccountExisted(email: string) {
    this.loadingCheckAccountExisted = true;

    const response = yield this.service.checkAccountExisted(email);
    const { errorCode, data } = response;
    if (data) {
      this.error = {
        errorCode,
        data: 'Account existed, please try another one.',
      };
    } else {
      this.error = null;
    }

    this.loadingCheckAccountExisted = false;

    return !Boolean(data);
  }
}

export const authViewModel = AuthViewModel.sharedInstance();
