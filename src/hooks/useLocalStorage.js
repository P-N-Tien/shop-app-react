import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const item = window.localStorage.getItem(key);
      if (item) setStoredValue(JSON.parse(item));
    };

    // Lắng nghe thay đổi từ tab khác
    window.addEventListener("storage", handleStorageChange);
    // Lắng nghe thay đổi trong cùng 1 tab (Custom Event)
    window.addEventListener("local-storage-update", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage-update", handleStorageChange);
    };
  }, [key]);

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
    // Bắn ra event để các hook cùng tab nhận được
    window.dispatchEvent(new Event("local-storage-update"));
  };

  return [storedValue, setValue];
}
