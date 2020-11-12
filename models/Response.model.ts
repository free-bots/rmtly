import {ApplicationEntry} from './ApplicationEntry';

export class ExecuteResponse {
  constructor(application: ApplicationEntry) {
    this.application = application;
  }

  public application: ApplicationEntry
}
