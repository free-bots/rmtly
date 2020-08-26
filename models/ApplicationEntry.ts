export class ApplicationEntry {
  public id: string;
  public version: number;
  public type: string;
  public name: string;
  public comment: string;
  public tryExec: string;

  public exec: string;
  public icon: string;
  public mimeType: string[];
  public actions: Action[];
  public categories: string[];

  constructor(
    id: string,
    version: number,
    type: string,
    name: string,
    comment: string,
    tryExec: string,
    exec: string,
    icon: string,
    mimeType: string[],
    actions: Action[],
    categories: string[],
  ) {
    this.id = id;
    this.version = version;
    this.type = type;
    this.name = name;
    this.comment = comment;
    this.tryExec = tryExec;
    this.exec = exec;
    this.icon = icon;
    this.mimeType = mimeType;
    this.actions = actions;
    this.categories = categories;
  }
}

export class Action {
  public name: string;
  public exec: string;
  public icon: string;

  constructor(name: string, exec: string, icon: string) {
    this.name = name;
    this.exec = exec;
    this.icon = icon;
  }
}

export class ApplicationEntryWithIcon {
  public application: ApplicationEntry;
  public base64Icon: string;

  constructor(application: ApplicationEntry, base64Icon: string) {
    this.application = application;
    this.base64Icon = base64Icon;
  }
}
