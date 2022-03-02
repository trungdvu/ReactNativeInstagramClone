import { AsyncStorageService } from './async-storage-service';

export class LocalStorageService {
  private get key() {
    return this.constructor.name;
  }

  async save() {
    const jsonString = JSON.stringify(this);
    await AsyncStorageService.save(this.key, jsonString);
  }

  async load() {
    const jsonString = await AsyncStorageService.load(this.key);
    if (jsonString) {
      const jsonObject = JSON.parse(jsonString);
      Object.assign(this, jsonObject);
    }
  }
}
