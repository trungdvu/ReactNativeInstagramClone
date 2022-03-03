import { LocalStorageService } from 'services/local-storage-service';
import { logd, toJSONStr } from './log';

const TAG = 'APP_LOCAL_SETTINGS';

class AppLocalSettings extends LocalStorageService {
  private static instance: AppLocalSettings;

  didShowOnboarding = false;
  theme: 'light' | 'dark' = 'light';

  public static shareInstance(): AppLocalSettings {
    if (!AppLocalSettings.instance) {
      AppLocalSettings.instance = new AppLocalSettings();
    }

    return AppLocalSettings.instance;
  }

  async load() {
    await super.load();
    logd(TAG, `load: ${toJSONStr(this)}`);
  }
}

export const appLocalSettings = AppLocalSettings.shareInstance();
