import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:raju.hoque97@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);
interface StoredSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export async function POST(req: NextRequest) {
  const { title, body } = await req.json();

  const response = await fetch("http://localhost:3000/api/save-subscription");
  const subscriptions = await response.json();

  const payload = JSON.stringify({ title, body });

  const promises = subscriptions.map((sub:StoredSubscription) =>
    webpush.sendNotification(sub, payload).catch(console.error)
  );

  await Promise.all(promises);

  return NextResponse.json({ success: true, sent: subscriptions.length });
}
