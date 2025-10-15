import { NextRequest, NextResponse } from "next/server";

// Type for storing subscriptions in memory
interface StoredSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

// Temporary in-memory storage (replace with DB in production)
const subscriptions: StoredSubscription[] = [];

/**
 * Save new subscription
 */
export async function POST(req: NextRequest) {
  try {
    const subscription = (await req.json());

    // ✅ Validate subscription structure
    if (
      !subscription.endpoint ||
      !subscription.keys?.p256dh ||
      !subscription.keys?.auth
    ) {
      return NextResponse.json(
        { error: "Invalid subscription object" },
        { status: 400 }
      );
    }

    // Check if already exists
    const exists = subscriptions.some(
      (sub) => sub.endpoint === subscription.endpoint
    );
    if (!exists) {
      subscriptions.push({
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        },
      });
      console.log("✅ New subscription saved:", subscription.endpoint);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Failed to save subscription", error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

/**
 * Return all subscriptions
 */
export async function GET() {
  return NextResponse.json(subscriptions);
}
