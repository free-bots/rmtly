export class IconResponse {
  public applicationId: string;
  public iconBase64: string;

  constructor(applicationId: string, iconBase64: string) {
    this.applicationId = applicationId;
    this.iconBase64 = iconBase64;
  }
}
