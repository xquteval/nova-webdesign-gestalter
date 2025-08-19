import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Impressum from "./pages/Impressum.tsx";
import Datenschutz from "./pages/Datenschutz.tsx";
import AGB from "./pages/AGB.tsx";
import Webdesign from "./pages/Webdesign.tsx";
import Webentwicklung from "./pages/Webentwicklung.tsx";
import WebHosting from "./pages/WebHosting.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: "/impressum",
    element: <Impressum />,
  },
  {
    path: "/datenschutz", 
    element: <Datenschutz />,
  },
  {
    path: "/agb",
    element: <AGB />,
  },
  {
    path: "/webdesign",
    element: <Webdesign />,
  },
  {
    path: "/webentwicklung", 
    element: <Webentwicklung />,
  },
  {
    path: "/web-hosting",
    element: <WebHosting />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
