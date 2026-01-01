import React from "react";
// import { useState, useCallback } from "react";
// import axios from "axios";
import NewsList from "./components/NewsList";
import Categories from "./components/categories";
import { Routes, Route } from "react-router-dom";
import NewsPage from "./pages/NewsPage";

function App() {
  // const [data, setData] = useState(null);
  // const [category, setCategory] = useState("all");
  // const onSelect = useCallback((category) => setCategory(category), []);

  // const onClick = () => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/todos/1")
  //     .then((response) => {
  //       setData(response.data);
  //     });
  // };

  // const onClick = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://newsapi.org/v2/top-headlines?country=us&apiKey=여러분 꺼"
  //     );
  //     setData(response.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <>
      {/* <Categories category={category} onSelect={onSelect} />
      <NewsList category={category} /> */}

      <Routes>
        <Route path="/" element={<NewsPage />}></Route>
        <Route path="/:category" element={<NewsPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
