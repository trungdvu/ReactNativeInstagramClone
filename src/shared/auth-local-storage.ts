import { LocalStorageService } from 'services/local-storage-service';
import { logd, toJSONStr } from './log';

const TAG = 'AUTH_LOCAL_STORAGE';

class AuthLocalStorage extends LocalStorageService {
  private static instance: AuthLocalStorage;

  accessToken: string = '';
  auth: any = null;

  public static sharedInstance(): AuthLocalStorage {
    if (!AuthLocalStorage.instance) {
      AuthLocalStorage.instance = new AuthLocalStorage();
    }

    return AuthLocalStorage.instance;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
    this.save();
    logd(TAG, `setAccessToken ${token} successfully`);
  }

  setAuth(auth: any) {
    this.auth = auth;
    this.save();
    logd(TAG, `setAuth ${auth} successfully`);
  }

  async load() {
    await super.load();
    logd(TAG, `load: ${toJSONStr(this)}`);
  }
}

export const authLocalStorage = AuthLocalStorage.sharedInstance();
