import React, { useState } from "react";
import "./Practice.css";
import { FaRocket } from "react-icons/fa";

const Practice = () => {
  const [cancel, setCancel] = useState([
    { id: 1, text: "눈사람", checked: false },
    { id: 2, text: "눈", checked: false },
  ]);

  const onClickCancel = (id) => {
    const nextCancel = cancel.map((can) =>
      can.id === id ? { ...can, checked: !can.checked } : can
    );
    setCancel(nextCancel);
  };

  const cancelList = cancel.map((can) => (
    <div key={can.id} className="list-item-container">
      <span
        className={`list-item-text ${can.checked ? "strikethrough" : ""}`}
        onClick={() => onClickCancel(can.id)}
      >
        {can.text}
      </span>
    </div>
  ));
  return (
    <div>
      <h1> 기초 연습하기 </h1>
      <div>🚀⭐⭐⭐⭐</div>
      <div>{cancelList}</div>
      <div className="box">박스1</div>
      <div className="box">박스2</div>
      <div className="box special">박스3</div>
      <p className="text">이건 문장입니다.</p>
      <button className="btn">버튼</button>
    </div>
  );
};

export default Practice;
