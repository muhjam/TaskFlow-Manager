export const storage = {
  get: <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  set: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
};

export const STORAGE_KEYS = {
  USERS: 'taskflow_users',
  TASKS: 'taskflow_tasks',
  AUTH_SESSION: 'taskflow_auth_session',
};
