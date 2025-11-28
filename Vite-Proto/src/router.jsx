import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Default from "./layout/Default";
import {
  MusicalsPageLoader,
  detailPageLoader,
} from "./loaders/productsLoaders";
import { cartPageLoader } from "./loaders/cartLoaders";

// 일반 import
import MainPage from "./pages/MainPage";
import MusicalsPage from "./pages/MusicalsPage";
import CartPage from "./pages/CartPage";
import DetailPage from "./pages/DetailPage";
import GuidePage from "./pages/GuidePage";
import NoticePage from "./pages/NoticePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    children: [
      { path: "", element: <MainPage /> },

      {
        path: "/musicals",
        element: <MusicalsPage />,
        loader: MusicalsPageLoader,
      },
      { path: "/guide", element: <GuidePage /> },
      { path: "/notice", element: <NoticePage /> },
      { path: "/cart", element: <CartPage />, loader: cartPageLoader },
      {
        path: "detail/:productId",
        element: <DetailPage />,
        loader: detailPageLoader,
      },
    ],
  },
]);

export default router;
