import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T)
) => {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.get(key);

    if (!localValue) {
      return typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;
    } else {
      return JSON.parse(localValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  return [value, setValue] as [T, typeof setValue];
};
