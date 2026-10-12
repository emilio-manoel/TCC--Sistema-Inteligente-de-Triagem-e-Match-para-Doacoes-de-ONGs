import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import DonorChatPage from "./pages/DonorChatPage";
import RegisterOngPage from "./pages/RegisterOngPage";
import History from "./pages/History";

export const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <DonorChatPage />,
        },
        {
          path: "/:id",
          element: <DonorChatPage />,
        },
        {
          path: "/historico",
          element: <History />,
        },
        {
          path: "/cadastrar-ong",
          element: <RegisterOngPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
