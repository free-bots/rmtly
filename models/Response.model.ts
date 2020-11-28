import {ApplicationEntry} from './ApplicationEntry';

export class ExecuteResponse {
  constructor(application: ApplicationEntry) {
    this.application = application;
  }

  public application: ApplicationEntry;
}

export class SortedApplicationResponse {
  constructor(sortedBy: SortKey, values: SortedValue[]) {
    this.sortedBy = sortedBy;
    this.values = values;
  }
  public sortedBy: SortKey;
  public values: SortedValue[];
}

export class SortedValue {
  public sortedValue: string;
  public applicationEntries: ApplicationEntry[];

  constructor(sortedValue: string, applicationEntries: ApplicationEntry[]) {
    this.sortedValue = sortedValue;
    this.applicationEntries = applicationEntries;
  }
}

export enum SortKey {
  CATEGORY = 'category',
}

export class SignUpResponse {
  public token: string;

  constructor(token: string) {
    this.token = token;
  }
}
