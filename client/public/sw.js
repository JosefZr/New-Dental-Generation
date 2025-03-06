/* eslint-env serviceworker */
import * as PusherPushNotifications from "@pusher/push-notifications-web";

importScripts("https://js.pusher.com/beams/service-worker.js");
const beamsClient = new PusherPushNotifications.Client({
  instanceId: "35cd6f1f-efdb-43c0-b321-1500e97dd08d",
});

beamsClient
  .start()
  .then((beamsClient) => beamsClient.getDeviceId())
  .then((deviceId) =>
    console.log("Successfully registered with Beams. Device ID:", deviceId)
  )
  .catch(console.error);

self.addEventListener("activate", (event) => {
    event.waitUntil(
        self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: '35cd6f1f-efdb-43c0-b321-1500e97dd08d',
        }).then((subscription) => {
            console.log("🔔 Push subscription:", subscription);
        }).catch((err) => {
            console.error("❌ Push subscription failed:", err);
        })
    );
});

self.addEventListener("push", function(event) {
    console.log("📩 Push event received:", event);
    event.waitUntil(
        self.registration.showNotification("New Notification", {
            body: "You have a new message!",
            icon: "/logo.png", // Ensure this icon exists in the public folder
        })
    );
});
