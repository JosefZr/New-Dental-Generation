//src/swDev
export default function swDev(){
    const VAPID_PUBLIC_KEY="BAdoXoz17PDRF7f2SNEOtykO0w3DVSPEat4hBXYJv_4_L9SA6avhkt7Nzka9IFAlYmnTwLNJsoNDFkUf4nCSGTQ"
    const VAPID_PRIVATE_KEY="qXVArLtGSw3mJCqUqAqE3PmFNO2XnKyd9xXFuenFCEY"
    function determineAppServerKey() {
        const base64String = VAPID_PUBLIC_KEY;
        const padding = "=".repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    // function determineAppServerKey(){
    //     var vapidPublicKey = VAPID_PUBLIC_KEY
    //     return urlBase64ToUint8Array(vapidPublicKey)
    // }
    // function urlBase64ToUint8Array(base64String) {
    //     const padding = '='.repeat((4 - base64String.length % 4) % 4);
    //     const base64 = (base64String + padding)
    //       .replace(/-/g, '+')
    //       .replace(/_/g, '/');
       
    //     const rawData = window.atob(base64);
    //     const outputArray = new Uint8Array(rawData.length);
       
    //     for (let i = 0; i < rawData.length; ++i) {
    //       outputArray[i] = rawData.charCodeAt(i);
    //     }
    //     return outputArray;
    //   }

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js").then((registration) => {
            console.log("✅ Service Worker Registered:", registration);

            return registration.pushManager.getSubscription().then((subscription) => {
                if (subscription) {
                    console.log("🔔 Already Subscribed:", subscription);
                    return subscription;
                }

                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: determineAppServerKey(),
                });
            });
        }).then((subscription) => {
            console.log("📩 Push Subscription:", subscription);
        }).catch((error) => {
            console.error("❌ Service Worker Error:", error);
        });
    } else {
        console.warn("❌ Service Worker is not supported in this browser");
    }
}