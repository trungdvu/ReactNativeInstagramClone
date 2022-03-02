const TAG = 'LOGIN_VIEW_MODEL';

class LoginViewModel {
  private static instance: LoginViewModel;

  private constructor() {}

  loading = false;

  public static sharedInstance(): LoginViewModel {
    if (!LoginViewModel.instance) {
      LoginViewModel.instance = new LoginViewModel();
    }

    return LoginViewModel.instance;
  }
}
