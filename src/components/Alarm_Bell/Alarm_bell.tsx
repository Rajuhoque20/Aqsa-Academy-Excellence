"use client";
import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAlarmStore } from "src/store/alarmStore";

interface AlarmDTO {
  time: string;
  type: string;
}

interface AudioMap {
  type: string;
  audio: string;
}

const audioSources: AudioMap[] = [
  { type: "caller", audio: "/caller_voice.mp3" },
  { type: "bell", audio: "/alarm_bell_multiple.mp3" },
  { type: "lunch_break", audio: "/lunch_break.mp3" },
];

export default function AlarmBell() {
  const { enabled } = useAlarmStore();
  const [alarms, setAlarms] = useState<AlarmDTO[]>([]);
  const lastTriggeredRef = useRef<Set<string>>(new Set());

  /**
   * Build a lookup map for faster audio matching
   */
  const audioMap = useMemo(() => {
    const map = new Map<string, string>();
    audioSources.forEach((a) => map.set(a.type, a.audio));
    return map;
  }, []);

  /**
   * Merge alarm times with audio URLs
   */
  const bellTimes = useMemo(
    () =>
      alarms
        .map((alarm) => ({
          ...alarm,
          audio: audioMap.get(alarm.type) || "",
        }))
        .filter((b) => b.audio !== ""),
    [alarms, audioMap]
  );

  /**
   * Fetch alarms from API
   */
  const getAlarm = useCallback(async () => {
    try {
      const res = await axios.get("/api/alarm");
      setAlarms(res.data || []);
    } catch (error) {
      console.error("❌ Error fetching alarms:", error);
    }
  }, []);

  useEffect(() => {
    getAlarm();
  }, [getAlarm]);

  /**
   * Register service worker once
   */
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("✅ Service Worker registered"))
        .catch((err) => console.error("❌ SW registration failed", err));
    }
  }, []);

  /**
   * Listen for SW messages
   */
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const handler = (event: MessageEvent) => {
      if (event.data?.type === "play-audio" && event.data?.url) {
        const audio = new Audio(event.data.url);
        audio.play().catch(() => console.warn("⚠️ Autoplay blocked"));
      }
    };
    navigator.serviceWorker.addEventListener("message", handler);
    return () => navigator.serviceWorker.removeEventListener("message", handler);
  }, []);

  /**
   * Interval checker to ring bells at the right time
   */
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      const now = new Date();
      const current = now.toTimeString().slice(0, 5);

      bellTimes.forEach((item) => {
        const triggerId = `${item.time}-${item.type}`;
        if (item.time === current && !lastTriggeredRef.current.has(triggerId)) {
          lastTriggeredRef.current.add(triggerId);

          console.log(`🔔 Triggering alarm: ${item.type} at ${item.time}`);
          const sound = new Audio(item.audio);
          sound.play().catch(() => console.warn("⚠️ Autoplay blocked"));

          fetch("/api/send-push", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: "Alarm ⏰",
              body: `It's ${current} (${item.type})! 🔔`,
            }),
          }).catch((err) => console.error("❌ Push error", err));
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled, bellTimes]);

  return null;
}
