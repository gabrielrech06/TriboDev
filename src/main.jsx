import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Importando as funções para a criação de rotas
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

// Páginas
import Home from "./routes/Home.jsx";
import NewPost from "./routes/NewPost.jsx";
import PostDetail from "./routes/PostDetails.jsx";

// Rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/new",
        element: <NewPost />,
      },
      {
        path: "/posts",
        element: <PostDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
