import React, { useCallback, useMemo, useState, useRef } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중...");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  console.log(numbers);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const inputEl = useRef(null);

  //   마운트 될 때만 함수 생성
  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []);

  // number 혹은 list가 업데이트 되었을 때만 생성
  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    inputEl.current.focus();
  }, [number, list]);

  // const onChange = (e) => {
  //   setNumber(e.target.value);

  // };

  // const onInsert = () => {
  //   const nextList = list.concat(parseInt(number));
  //   setList(nextList);
  //   setNumber("");
  // };

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl}></input>
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => {
          <li key={index}>{value}</li>;
        })}
      </ul>
      <div>
        <b>평균값은 : </b>
        {avg}
      </div>
    </div>
  );
};

export default Average;
