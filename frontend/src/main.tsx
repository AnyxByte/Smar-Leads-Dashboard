import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { GoogleOAuthProvider } from "@react-oauth/google"; // ─── 1. IMPORT PROVIDER
import Dashboard from "./pages/Dashboard.tsx";
// @ts-expect-error: side-effect import for CSS
import "./index.css";
import Landing from "./pages/Landing.tsx";
import Auth from "./pages/Auth.tsx";
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ??
  "YOUR_FALLBACK_CLIENT_ID.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </GoogleOAuthProvider>
  </StrictMode>,
);
