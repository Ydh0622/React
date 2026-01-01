import React from "react";

// 상위 TravelTemplate에서 props를 주입
const TravelList = ({ places, onClickCancel, onRemove }) => {
  const placeList = places.map((place) => (
    <div key={place.id} className="list-item-container">
      <span
        className={`list-item-text ${place.checked ? "strikethrough" : ""}`}
        onClick={() => onClickCancel(place.id)}
      >
        {place.text}
      </span>
      <button className="delete-button" onClick={() => onRemove(place.id)}>
        <i className="fas fa-trash-alt ">삭제</i>{" "}
      </button>
    </div>
  ));

  return (
    <div className="list-area">
      {placeList.length > 0 ? (
        placeList
      ) : (
        <p className="empty-message">여행지를 추가해보세요!</p>
      )}
    </div>
  );
};

export default TravelList;
