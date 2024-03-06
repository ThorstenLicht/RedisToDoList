export interface Entry {
  todo: string;
  owner: string;
  status: string;
  priority: string;
}

export interface RenderEntriesProps {
  entries: Array<Entry>;
  sendJsonMessage: Function;
}

export interface InteractionsProps {
  entry: Entry;
  sendJsonMessage: Function;
}

export interface NewEntryProps {
  sendJsonMessage: Function;
  username: string;
}
