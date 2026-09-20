export const safeReadStorage = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const safeWriteStorage = <T>(key: string, value: T) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota or blocked storage issues.
  }
};

export const safeRemoveStorage = (key: string) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage access issues.
  }
};
