import React, { useCallback, useRef, useState } from "react";
import "./Trip.css";

const Trip = () => {
  const [number, setNumber] = useState("");
  const [list, setList] = useState([]);
  const InputEl = useRef(null);

  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []);

  const onInsert = useCallback(() => {
    if (number.trim() === "") return;
    setList((prevList) => [...prevList, number]);
    setNumber("");
    InputEl.current.focus();
  }, [number]);

  return (
    <div className="body">
      <h1>가자 여행</h1>
      <div className="input-area">
        <input
          value={number}
          onChange={onChange}
          ref={InputEl}
          placeholder="가고싶은 여행지를 입력하세요"
        />
        <button className="btn" onClick={onInsert}>
          등록
        </button>
      </div>
      <ul style={{ width: "600px" }}>
        {list.map((item, idx) => (
          <li key={idx} style={{ fontSize: "20px", padding: "8px 0" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trip;
