import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageService {
  static async save(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  }

  static async load(key: string) {
    return AsyncStorage.getItem(key);
  }
}
