export class ExecuteRequest {
  public executeDelay: number;

  constructor(executeDelay: number) {
    this.executeDelay = executeDelay;
  }
}

export interface SignUpRequest {
  url: string;
  qrCode: string;
  deviceId: string;
}
