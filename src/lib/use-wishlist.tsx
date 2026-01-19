"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "wishlist";

let memory: number[] = [];
const listeners: Array<(ids: number[]) => void> = [];

function notify() {
  listeners.forEach((l) => l(memory));
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    memory = raw ? JSON.parse(raw) : [];
  } catch {
    memory = [];
  }
}

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  } catch {}
}

/* ---------- Public API ---------- */

export function addToWishlist(id: number) {
  if (!memory.includes(id)) {
    memory = [id, ...memory];
    saveToStorage();
    notify();
  }
}

export function removeFromWishlist(id: number) {
  if (memory.includes(id)) {
    memory = memory.filter((i) => i !== id);
    saveToStorage();
    notify();
  }
}

export function toggleWishlist(id: number) {
  memory.includes(id) ? removeFromWishlist(id) : addToWishlist(id);
}

export function isInWishlist(id: number) {
  return memory.includes(id);
}

/* ---------- Hook ---------- */

export function useWishlist() {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    loadFromStorage();
    setIds(memory);

    const listener = (newIds: number[]) => setIds(newIds);
    listeners.push(listener);

    return () => {
      const idx = listeners.indexOf(listener);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  return {
    ids,
    add: addToWishlist,
    remove: removeFromWishlist,
    toggle: toggleWishlist,
    isIn: (id: number) => memory.includes(id),
  };
}
