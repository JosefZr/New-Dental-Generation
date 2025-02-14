//public/sw.js
console.warn("sw file is public folder");

// Listen for Push Notifications
self.addEventListener("push", (event) => {
    console.log("📩 Push Event Received");

    const options = {
        body: "Hello from notifications",
        icon: "/CompressJPEG.Online_img(512x512).png", // Optional: add an icon
    };

    event.waitUntil(
        self.registration.showNotification("Hello", options)
    );
});

// In service-worker.js
self.addEventListener('push', (event) => {
    if (event.data.type === 'SHOW_NOTIFICATION') {
      self.registration.showNotification("Dropdown Clicked", {
        body: "You have opened the dropdown menu.",
        icon: "/client/public/CompressJPEG.Online_img(512x512).png"
      });
    }
  });
