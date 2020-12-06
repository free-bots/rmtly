import AsyncStorage from '@react-native-async-storage/async-storage';

const URL = 'URL';
const TOKEN = 'TOKEN';

export class ConfigStorage {
  private static instance: ConfigStorage;
  private storageCopy: Map<string, string | null> = new Map<
    string,
    string | null
  >();

  private onUpdated: {key: string; callback: () => void}[] = [];

  constructor() {
    this.onUpdate().catch((error) => console.error(error));
  }

  private async onUpdate() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);
      this.storageCopy.clear();
      values.forEach((pair) => {
        this.storageCopy.set(pair[0], pair[1]);
      });
    } catch (error) {
      console.error(error);
    }
    this.onUpdated.forEach((listener) => {
      try {
        listener.callback();
      } catch (error) {
        console.error(error);
      }
    });
  }

  private getValue(key: string): string | null {
    if (this.storageCopy.has(key)) {
      return this.storageCopy.get(key) || null;
    }
    return null;
  }

  public static getInstance(): ConfigStorage {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ConfigStorage();
    return this.instance;
  }

  public setUrl(url: string): Promise<void> {
    return AsyncStorage.setItem(URL, url).then(() => this.onUpdate());
  }

  public getUrl(): string | null {
    return this.getValue(URL);
  }

  public setToken(token: string | null): Promise<void> {
    if (!token) {
      return AsyncStorage.removeItem(TOKEN).then(() => this.onUpdate());
    }
    return AsyncStorage.setItem(TOKEN, token).then(() => this.onUpdate());
  }

  public getToken(): string | null {
    return this.getValue(TOKEN);
  }

  public forceUpdate() {
    this.onUpdate();
  }

  public subscribeOnUpdate(listener: {key: string; callback: () => void}) {
    this.onUpdated.push(listener);
  }

  public unSubscribeOnUpdate(key: string) {
    this.onUpdated = this.onUpdated.filter((listener) => listener.key !== key);
  }
}

export const ConfigService = ConfigStorage.getInstance();
