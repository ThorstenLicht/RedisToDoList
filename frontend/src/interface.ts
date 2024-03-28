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

export interface CountdownEntryProps {
  startCount: number;
  allEntries: Array<Entry>;
  entry: Entry;
  setEntries: Function;
}

export interface CountdownUserProps {
  startCount: number;
  allUsers: Array<User>;
  user: User;
  setUsers: Function;
}

export interface ToDoListProps {
  entries: Array<Entry>;
  setEntries: Function;
}

export interface UserCardProps {
  user: User;
  setUsers: Function;
  users: Array<User>;
  sendJsonMessage: Function;
}

export interface UserListProps {
  users: Array<User>;
  setUsers: Function;
  sendJsonMessage: Function;
}

export interface UserManagementProps {
  users: Array<User>;
  setUsers: Function;
}

export interface WebsocketProps {
  entries: Array<Entry>;
  setEntries: Function;
  setUsers: Function;
  users: Array<User>;
}

export interface AdminExists {
  adminExists: number;
}
