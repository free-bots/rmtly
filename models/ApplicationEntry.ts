export interface ApplicationEntry {
  id: string;
  version: number;
  type: string;
  name: string;
  comment: string;
  tryExec: string;

  exec: string;
  icon: string;
  mimeType: string[];
  actions: Action[];
  categories: string[];
}

export interface Action {
  name: string;
  exec: string;
  icon: string;
}

export interface ApplicationEntryWithIcon {
  application: ApplicationEntry;
  base64Icon: string;
}
