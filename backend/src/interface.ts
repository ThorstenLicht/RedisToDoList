import ws from "ws";

export interface ConnectionMap {
  [username: string]: ws;
}

export interface Entry {
  todo: string;
  owner: string;
  status: string;
  priority: string;
}

export interface CreateEntry {
  todo: string;
  owner: string;
  status: string;
}

export interface Status {
  todo: string;
  status: string;
}

export interface Priority {
  todo: string;
  priority: string;
  status: string;
}

export interface Message {
  messagetyp: string;
  entry: Entry;
}

export interface Info {
  messagetyp: string;
  message: string;
}
