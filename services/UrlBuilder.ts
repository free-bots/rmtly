export class UrlBuilder {
  private static readonly BASE_URL = 'http://10.0.2.2:3000';

  private static instance: UrlBuilder;

  private url: string = '';

  private constructor() {}

  public append(endpoint: string): UrlBuilder {
    this.url += `/${endpoint}`;
    return this;
  }

  public create(): string {
    return `${UrlBuilder.BASE_URL}${this.url}`;
  }

  public static getInstance(): UrlBuilder {
    return new UrlBuilder();
  }
}
