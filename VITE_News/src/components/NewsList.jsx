import styled from "styled-components";
import NewsItem from "./NewsItem";
// import { useState, useEffect } from "react";
import axios from "axios";
import usePromise from "../lib/usePromise";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

// const sampleArticle = {
//   title: "제목",
//   description: "내용",
//   url: " https://google.com",
//   urlImage: "https://via.placeholder.com/160",
// };

const NewsList = ({ category }) => {
  //   const [articles, setArticles] = useState(null);
  //   const [loading, setLoading] = useState(false);
  const [loading, response, error] = usePromise(() => {
    const query = category === "all" ? "" : `&category=${category}`;

    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=us${query}&apiKey=1b7ec98d0f8d40a9a34218a3ff947cbd`
    );
  }, [category]);

  //   useEffect(() => {
  //     // async를 사용하는 함수 따로 선언
  //     const fetchData = async () => {
  //       setLoading(true);
  //       try {
  //         const query = category === "all" ? "" : `&category=${category}`;
  //         const response = await axios.get(
  //           `https://newsapi.org/v2/top-headlines?country=us${query}&apiKey=1b7ec98d0f8d40a9a34218a3ff947cbd`
  //         );
  //         setArticles(response.data.articles);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //       setLoading(false);
  //     };
  //     fetchData();
  //   }, [category]);

  // 대기 중일 때
  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }

  // 아직 response 값이 설정되지 않았을 때
  if (!response) {
    return null;
  }

  if (error) {
    return <NewsList>에러 발생!</NewsList>;
  }

  // response 값이 유효할 때
  const { articles } = response.data;

  // 아직 articles 값이 설정되지 않았을 때
  // null에는 map 함수가 없기 때문에 검사를 하지 않으면 렌더링 과정에서 오류가 생김.
  //   if (!articles) {
  //     return null;
  //   }

  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
