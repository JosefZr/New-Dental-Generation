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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <BrowserRouter>
        <InstructorProvider>
          <CourseProvider>
            <UserProvider>
              <UserChatProvider>
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
            </UserChatProvider>
            </UserProvider>
          </CourseProvider>
        </InstructorProvider>
      </BrowserRouter>
    </StrictMode>
  </QueryClientProvider>
);