"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "appointment_products";
const STORAGE_TYPE =
  typeof window !== "undefined" ? window.sessionStorage : null;

let memory: string[] = [];
const listeners: Array<(ids: string[]) => void> = [];

function notify() {
  listeners.forEach((l) => l(memory));
}

function loadFromStorage() {
  if (!STORAGE_TYPE) return;
  try {
    const raw = STORAGE_TYPE.getItem(STORAGE_KEY);
    memory = raw ? JSON.parse(raw) : [];
  } catch {
    memory = [];
  }
}

function saveToStorage() {
  if (!STORAGE_TYPE) return;
  try {
    STORAGE_TYPE.setItem(STORAGE_KEY, JSON.stringify(memory));
  } catch {}
}

/* ---------- Public API ---------- */

export function addToAppointment(id: string) {
  if (!memory.includes(id)) {
    memory = [id, ...memory];
    saveToStorage();
    notify();
  }
}

export function removeFromAppointment(id: string) {
  if (memory.includes(id)) {
    memory = memory.filter((i) => i !== id);
    saveToStorage();
    notify();
  }
}

export function toggleAppointmentProduct(id: string) {
  memory.includes(id) ? removeFromAppointment(id) : addToAppointment(id);
}

export function isInAppointment(id: string) {
  return memory.includes(id);
}

export function clearAppointment() {
  memory = [];
  saveToStorage();
  notify();
}

/* ---------- Hook ---------- */

export function useAppointmentProducts() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    loadFromStorage();
    setIds(memory);

    const listener = (newIds: string[]) => setIds(newIds);
    listeners.push(listener);

    return () => {
      const idx = listeners.indexOf(listener);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  return {
    ids,
    add: addToAppointment,
    remove: removeFromAppointment,
    toggle: toggleAppointmentProduct,
    isIn: (id: string) => memory.includes(id),
    clear: clearAppointment,
  };
}
