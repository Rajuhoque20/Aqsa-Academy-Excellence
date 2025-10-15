'use client';
import { create } from 'zustand';

const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
  };

interface AlarmState {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  handleEnable: () => Promise<void>;
}

export const useAlarmStore = create<AlarmState>((set) => ({
  enabled: false,

  setEnabled: (value) => set({ enabled: value }),

  handleEnable: async () => {
    if (!('Notification' in window)) {
      alert('Notifications not supported on this browser');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert('Permission denied ❌');
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });

    await fetch('/api/save-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription),
    });

    set({ enabled: true });
  },
}));
