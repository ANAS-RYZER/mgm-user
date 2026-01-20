import * as React from "react";

const STORAGE_KEY = "wishlist";
let memory: number[] = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
})();

const listeners: Array<(ids: number[]) => void> = [];
function notify() {
  listeners.forEach((l) => l(memory));
}

export function addToWishlist(id: number) {
  if (!memory.includes(id)) {
    memory = [id, ...memory];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
    } catch {}
    notify();
  }
}

export function removeFromWishlist(id: number) {
  if (memory.includes(id)) {
    memory = memory.filter((i) => i !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
    } catch {}
    notify();
  }
}

export function toggleWishlist(id: number) {
  if (memory.includes(id)) removeFromWishlist(id);
  else addToWishlist(id);
}

export function isInWishlist(id: number) {
  return memory.includes(id);
}

export function useWishlist() {
  const [ids, setIds] = React.useState<number[]>(() => memory);

  React.useEffect(() => {
    const listener = (newIds: number[]) => setIds(newIds);
    listeners.push(listener);
    return () => {
      const idx = listeners.indexOf(listener);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  return {
    ids,
    add: (id: number) => addToWishlist(id),
    remove: (id: number) => removeFromWishlist(id),
    toggle: (id: number) => toggleWishlist(id),
    isIn: (id: number) => memory.includes(id),
  };
}
