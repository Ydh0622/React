import React from "react";

// 항목별 컴포넌트 정의
const PlaceItem = ({ place, onClickCancel, onRemove }) => {
  // console.log(`S{place.text} 렌더링`) 렌더링 여부 확인용
  return (
    <div key={place.id} className="list-item-container">
      <span
        className={`list-time-text ${place.checked ? "strikethrough" : ""}`}
        onClick={() => onClickCancel(place.id)}
      >
        {place.text}
      </span>
      <button className="delete-button" onClick={() => onRemove(place.id)}>
        삭제
      </button>
    </div>
  );
};

// React.memo 적용
// props (place, onClickCancel , onRemove) 가 바뀌지 않으면 리렌더링 X
export default React.memo(PlaceItem);
