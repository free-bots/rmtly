export class ExecuteRequest {
  public executeDelay: number;

  constructor(executeDelay: number) {
    this.executeDelay = executeDelay;
  }
}

export class SignUpRequest {
  public qrCode: string;
  public deviceId: string;

  constructor(qrCode: string, deviceId: string) {
    this.qrCode = qrCode;
    this.deviceId = deviceId;
  }
}
