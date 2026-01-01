import React, { useCallback, useReducer, useState } from "react";
import "./TravelApp.css"; // css파일 import
import PlaceItem from "./PlaceItem";
import { List } from "react-virtualized";

// 항목 엄청 많이 만드는 함수
function createBulkTodos() {
  const blukarray = [];
  for (let i = 1; i < 25000; i++) {
    blukarray.push({
      id: i,
      text: `장소 ${i}`,
      checked: false,
    });
  }
  return blukarray;
}

// Reducer
function travelReducer(state, action) {
  switch (action.type) {
    case "ADD_PLACE": {
      const newPlace = {
        id: state.nextId,
        text: action.payload,
        checked: false,
      };
      return {
        places: state.place.concat(newPlace),
        nextId: state.nextId + 1,
      };
    }
    case "TOGGLE_PLACE":
      return {
        ...state,
        places: state.places.map((place) =>
          place.id === action.payload.id
            ? { ...place, checked: !place.checked }
            : place
        ),
      };
    case "REMOVE_PLACE":
      return {
        ...state,
        places: state.places.filter((place) => place.id !== action.payload.id),
      };
    default:
      return state;
  }
}

// useReducer의 초기 상태 정의 함수
const getInitialState = () => ({
  places: initialBulkPlaces,
  nextId: initialBulkPlaces.length + 1,
});

// 항목 변수
const initialBulkPlaces = createBulkTodos();

// 여기는 필수사항이 아닌데, 교재랑 다른 환경이여서 보기 좋게 하는겁니다.
const LIST_HEIGHT = 400;
const LIST_WIDTH = 500;
const ROW_HEIGHT = 48;

const TravelApp = () => {
  //초기 목록 데이터는 이미지와 유사한 내용을 포함하도록 초기 설정
  // const [places, setPlaces] = useState([
  //   { id: 1, text: "송도센트럴파크", checked: false },
  //   { id: 2, text: "파주 프로방스 / 헤이리 마을", checked: false },
  //   { id: 3, text: "춘천 소양강 스카이워크", checked: true },
  // ]);

  // const [places, setPlaces] = useState(initialBulkPlaces);
  const [state, dispatch] = useReducer(travelReducer, null, getInitialState);

  const { places } = state;

  //초기 목록 3개이므로 기본 Id 값은 4부터 시작 없으면 1

  const [inputText, setInputText] = useState("");
  // const [nextId, setNextId] = useState(4);

  // const [nextId, setNextId] = useState(initialBulkPlaces.length + 1);

  // 입력 필드 값 변경 핸들러
  const onChange = (e) => setInputText(e.target.value);

  // 취소선 핸들러
  // const onClickCancel = (id) => {
  //   const nextPlaces = places.map((place) =>
  //     place.id === id ? { ...place, checked: !place.checked } : place
  //   );
  //   setPlaces(nextPlaces);
  // };

  // onClickCancel callback 함수 적용
  // const onClickCancel = useCallback((id) => {
  //   // setPlaces에 함수를 전달하여, 항상 최신 상태인 currentPlaces를 사용하게 함
  //   setPlaces((currentPlaces) =>
  //     currentPlaces.map((place) =>
  //       place.id === id ? { ...place, checked: !place.checked } : place
  //     )
  //   );
  // }, []);

  // Reducer 를 사용한 취소선
  const onClickCancel = useCallback((id) => {
    dispatch({ type: "TOGGLE_PLACE", payload: { id } });
  }, []);

  // ADD 버튼 눌렀을 때 항목 추가 핸들러
  // const onClick = () => {
  //   if (inputText.trim() === "") return; // 빈 값은 추가되지 않습니다.

  //   const nextPlaces = places.concat({
  //     id: nextId,
  //     text: inputText,
  //     checked: false,
  //   });
  //   setNextId(nextId + 1);
  //   setInputText("");
  //   setPlaces(nextPlaces);
  // };

  // Reducer를 사용한 항목 추가
  const onClick = () => {
    if (inputText.trim() === "") return; // 빈 값은 추가되지 않습니다.

    dispatch({
      type: "ADD_PLACE",
      payload: { text: inputText },
    });

    setInputText("");
  };

  // 삭제 버튼 눌러 삭제
  // const onRemove = (id) => {
  //   const nextPlaces = places.filter((place) => place.id !== id);
  //   setPlaces(nextPlaces);
  // };

  // onRemove callback 함수 적용
  // const onRemove = useCallback((id) => {
  //   setPlaces((currentPlaces) =>
  //     currentPlaces.filter((place) => place.id !== id)
  //   );

  // Reducer를 사용한 삭제 버튼
  const onRemove = useCallback((id) => {
    dispatch({ type: "REMOVE_PLACE", payload: { id } });
  }, []);

  // 엔터 키 입력시 항목 추가
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  // 목록 항목 렌더링
  // const placeList = places.map((place) => (
  //   <div key={place.id} className="list-item-container">
  //     <span
  //       className={`list-time-text ${place.checked ? "strikethrough" : ""}`}
  //       onClick={() => onClickCancel(place.id)}
  //     >
  //       {place.text}
  //     </span>
  //     <button className="delete-button" onClick={() => onRemove(place.id)}>
  //       삭제
  //     </button>
  //   </div>
  // ));

  const rowRender = ({ index, key, style }) => {
    const place = places[index];

    // List가 계살한 style을 최상위 요소에 반드시 적용해야 합니다.
    return (
      <div key={key} style={style}>
        <PlaceItem
          place={place}
          onClickCancel={onClickCancel}
          onRemove={onRemove}
        />
      </div>
    );
  };

  // PlaceItem 컴포넌트를 활용한 목록 렌더링
  // const placeList = places.map((place) => (
  //   <PlaceItem
  //     key={place.id}
  //     place={place}
  //     onClickCancel={onClickCancel}
  //     onRemove={onRemove}
  //   />
  // ));

  return (
    <div className="travel-planner-container">
      <header className="header">
        <span className="logo-icon">🚀</span>
        <h1 className="logo-text">가자여행</h1>
      </header>

      <div className="input-area">
        <input
          type="text"
          value={inputText}
          onChange={onChange}
          onKeyDown={onKeyPress}
          placeholder="가고싶은 여행지를 선택하세요"
          className="input-field"
        ></input>
        <button onClick={onClick} className="add-button">
          ADD
        </button>
      </div>

      <div className="total-count-area">
        <span className="total-label">TOTAL</span>
        <span className="total-count">{places.length}</span>
      </div>
      {/* 버츄얼 쓰기 전 목록 리스트 */}
      {/* <div className="list-area">
        {placeList.length > 0 ? (
          placeList
        ) : (
          <p className="empty-message"> 여행지를 추가해보세요! </p>
        )}
      </div> */}

      {/* List 컴포넌트 사용한 목록 렌더링 */}
      <div
        className="list-area"
        style={{ height: LIST_HEIGHT, width: LIST_WIDTH }}
      >
        {places.length > 0 ? (
          <List
            width={LIST_WIDTH}
            height={LIST_HEIGHT}
            rowCount={places.length}
            rowHeight={ROW_HEIGHT}
            rowRenderer={rowRender}
            overscanRowCount={10}
          />
        ) : (
          <p className="empty-message"> 여행지를 추가해보세요!</p>
        )}
      </div>
    </div>
  );
};

export default TravelApp;
