import React from "react";
import "./Card.css";

const Card = () => {
  return (
    <div>
      <h1>카드 연습하기</h1>
      <div className="card-container">
        <div className="card">
          <img src="https://picsum.photos/300/200"></img>
          <h2>예시 사진1</h2>
          <p>이건 사진1입니다.</p>
          <button>버튼</button>
        </div>
        <div className="card">
          <img src="https://picsum.photos/301/200"></img>
          <h2>예시 사진2</h2>
          <p>이건 사진2입니다.</p>
          <button>버튼</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
