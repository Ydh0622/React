import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Default from "./layout/Default";
import NotFound from "./pages/NotFound";
import { shopPageLoader, detailPageLoader } from "./loaders/productsLoaders";
import { cartPageLoader } from "./loaders/cartLoaders";

// 일반 import
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ShopPage from "./pages/ShopPage";
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
      { path: "/about", element: <AboutPage /> },
      { path: "/blog", element: <BlogPage /> },
      // { path: "/*", element: <NotFound /> },
      { path: "/shop", element: <ShopPage />, loader: shopPageLoader },
      { path: "/cart", element: <CartPage />, loader: cartPageLoader },
      {
        path: "detail/:productId",
        element: <DetailPage />,
        loader: detailPageLoader,
      },
      { path: "/mypage", element: <MyPage /> },
    ],
  },
]);

export default router;
