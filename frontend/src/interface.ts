export interface Entry {
  todo: string;
  owner: string;
  status: string;
  priority: number;
  remainingTime: number;
}

export interface User {
  username: string;
  password: string | null;
  remainingTime: number;
}

export interface RenderEntriesProps {
  entries: Array<Entry>;
  sendJsonMessage: Function;
  allEntries: Array<Entry>;
  setEntries: Function;
}

export interface InteractionsProps {
  entry: Entry;
  sendJsonMessage: Function;
}

export interface NewEntryProps {
  sendJsonMessage: Function;
}

export interface AdminExists {
  adminExists: number;
}
