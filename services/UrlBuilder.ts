import {ConfigService} from './Config.service';

export class UrlBuilder {
  private BASE_URL = 'http://10.0.2.2:3000';

  private url: string = '';

  private constructor() {}

  public append(endpoint: string): UrlBuilder {
    this.url += `/${endpoint}`;
    return this;
  }

  public create(customBaseUrl?: string): string {
    const configUrl = ConfigService.getUrl();
    if (configUrl) {
      console.log(configUrl);
      this.BASE_URL = configUrl;
    }

    return `${customBaseUrl || this.BASE_URL}${this.url}`;
  }

  public static getInstance(): UrlBuilder {
    return new UrlBuilder();
  }
}
