import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Default from "./layout/Default";
import NotFound from "./pages/NotFound";
import {
  MusicalsPageLoader,
  detailPageLoader,
} from "./loaders/productsLoaders";
import { cartPageLoader } from "./loaders/cartLoaders";

// 일반 import
import MainPage from "./pages/MainPage";
import GuidePage from "./pages/GuidePage";
import NoticePage from "./pages/NoticePage";
import MusicalsPage from "./pages/MusicalsPage";
import CartPage from "./pages/CartPage";
import DetailPage from "./pages/DetailPage";
import MyPage from "./pages/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "/guide", element: <GuidePage /> },
      { path: "/notice", element: <NoticePage /> },
      // { path: "/*", element: <NotFound /> },
      {
        path: "/musicals",
        element: <MusicalsPage />,
        loader: MusicalsPageLoader,
      },
      { path: "/cart", element: <CartPage />, loader: cartPageLoader },
      {
        path: "detail/:productId",
        element: <DetailPage />,
        loader: detailPageLoader,
      },
      { path: "/mypage", element: <MyPage />, loader: cartPageLoader },
    ],
  },
]);

export default router;
