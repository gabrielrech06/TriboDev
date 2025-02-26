import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Importando as funções para a criação de rotas
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

// Páginas
import Home from "./routes/Home.jsx";
import NewPost from "./routes/NewPost.jsx";

// Rotas
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new",
        element: <NewPost />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
