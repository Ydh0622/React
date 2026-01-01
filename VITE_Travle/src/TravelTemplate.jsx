import React, { useState } from "react";
import "./TravelApp.css";

const TravelTemplate = ({ children }) => {
  // children을 props로 받음
  // 모든 상태 관리
  const [places, setPlaces] = useState([
    { id: 1, text: "송도 센트럴파크", checked: false },
    { id: 2, text: "파주 프로방스 / 헤이리 마을", checked: true },
    { id: 3, text: "춘천 소양강 스카이워크", checked: true },
  ]);

  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(4);

  // 입력 필드 값 변경 핸들러
  const onChange = (e) => setInputText(e.target.value);

  // 취소선 토글 핸들러
  const onClickCancel = (id) => {
    const nextPlaces = places.map((place) =>
      place.id === id ? { ...place, checked: !place.checked } : place
    );
    setPlaces(nextPlaces);
  };

  // 항목 추가 핸들러
  const onClick = () => {
    if (inputText.trim() === "") return;

    const nextPlaces = places.concat({
      id: nextId,
      text: inputText,
      checked: false,
    });
    setNextId(nextId + 1);
    setPlaces(nextPlaces);
    setInputText("");
  };

  // 항목 삭제 핸들러
  const onRemove = (id) => {
    const nextPlaces = places.filter((place) => place.id !== id);
    setPlaces(nextPlaces);
  };

  return (
    <div className="travel-planner-container">
      <header className="header">
        <span className="logo-icon">🚀</span>
        <h1 className="logo-text">가자여행</h1>
      </header>

      {/* TOTAL 카운트 영역 */}
      <div className="total-count-area">
        <span className="total-label">TOTAL</span>
        <span className="total-count">{places.length}</span>
      </div>

      {/* 하위 컴포넌트(children)에 props를 전달하며 렌더링 */}
      {/* React.Children.map을 사용하여 모든 자식에 props를 주입 */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // 자식 컴포넌트의 타입에 따라 필요한 props만 전달
          if (child.type.name === "TravelInsert") {
            return React.cloneElement(child, {
              inputText: inputText,
              onChange: onChange,
              onClick: onClick,
            });
          }
          if (child.type.name === "TravelList") {
            return React.cloneElement(child, {
              places: places,
              onClickCancel: onClickCancel,
              onRemove: onRemove,
            });
          }
          // 그 외 자식은 그대로 렌더링
          return child;
        }
        return child;
      })}
    </div>
  );
};

export default TravelTemplate;
