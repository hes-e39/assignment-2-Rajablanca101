import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Link,
  Outlet,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";

import "./index.css";
import "./styles.css";
import TimersView from "./views/TimersView";
import DocumentationView from "./views/DocumentationView";
import { TimerProvider } from "./components/timers/TimerContext"; // Import the provider

const PageIndex = () => {
  return (
    <div>
      <h1>Assignment</h1>
      <ul>
        <li>
          <Link to="/">Timers</Link>
        </li>
        <li>
          <Link to="/docs">Documentation</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

const router = createHashRouter([
  {
    path: "/",
    element: (
      <TimerProvider> {/* Wrap the relevant part */}
        <PageIndex />
      </TimerProvider>
    ),
    children: [
      {
        index: true,
        element: <TimersView />, // This now has access to TimerContext
      },
      {
        path: "/docs",
        element: <DocumentationView />, // No TimerContext access needed
      },
    ],
  },
]);

// biome-ignore lint/style/noNonNullAssertion: root html element is there
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);