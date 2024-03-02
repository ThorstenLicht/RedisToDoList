import ws from "ws";

export interface ConnectionMap {
  [username: string]: ws;
}
