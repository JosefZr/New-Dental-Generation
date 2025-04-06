import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.jsx";
import "./index.css";
import { HashRouter as BrowserRouter } from "react-router-dom";
import InstructorProvider from "./context/InstructorContext.jsx";
import { Toaster } from "react-hot-toast";
import CourseProvider from "./context/CoursesContext.jsx";
import { ModalProvider } from "./components/providers/modal-provider.jsx";
import UserProvider from "./context/UserContext.jsx";
import { UserChatProvider } from "./context/ToChatUser.jsx";
import SunnahProvider from "./context/sunnahContext.jsx";
const queryClient = new QueryClient();
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import { HelmetProvider } from 'react-helmet-async';
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <InstructorProvider>
          <CourseProvider>
            <UserProvider>
              <UserChatProvider>
                <SunnahProvider>
                  <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                      success: {
                        duration: 3000,
                      },
                      error: {
                        duration: 3000,
                      },
                      style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "wheat",
                        color: "black",
                      },
                    }}
                  />
                  <ModalProvider>
                    <App />
                  </ModalProvider>
                </SunnahProvider>
              </UserChatProvider>
            </UserProvider>
          </CourseProvider>
        </InstructorProvider>
      </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  </QueryClientProvider>
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);

      // Request permission for notifications
      return Notification.requestPermission();
    })
    .then(function(permission) {
      if (permission === 'granted') {
        console.log('Notification permission granted.');

        // Register device with Pusher Beams
        const beamsClient = new PusherPushNotifications.Client({
          instanceId: '35cd6f1f-efdb-43c0-b321-1500e97dd08d',
        });

        beamsClient.start()
          .then(() => beamsClient.addDeviceInterest('hello'))
          .then(() => console.log('Successfully registered and subscribed!'))
          .catch(console.error);
      }
    })
    .catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
}

