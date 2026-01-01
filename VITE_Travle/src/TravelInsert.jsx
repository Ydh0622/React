import React from "react";

// 상위 TravelTemplate에서 props를 주입
const TravelInsert = ({ inputText, onChange, onClick }) => {
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <div className="input-area">
      <input
        type="text"
        value={inputText}
        onChange={onChange}
        onKeyDown={onKeyPress}
        placeholder="가고싶은 여행지를 입력하세요"
        className="input-field"
      />
      <button onClick={onClick} className="add-button">
        ADD <i className="fas fa-plus-circle"></i>
      </button>
    </div>
  );
};

export default TravelInsert;
