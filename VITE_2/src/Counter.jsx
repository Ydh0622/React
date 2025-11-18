import React, { useReducer } from "react";

function reducer(state, action) {
  // action.type에 따른 다른 작업을 수행
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    case "RESET":
      return { value: 0 };
    default:
      // 아무것도 해당되지 않을 때
      return state;
  }
}

const Counter = () => {
  //   const [value, setValue] = useState(0);
  const [state, dispatch] = useReducer(reducer, { value: 0 });
  const [state2, dispatch2] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      <button
        onClick={() => {
          dispatch({ type: "INCREMENT" });
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          dispatch({ type: "DECREMENT" });
        }}
      >
        -1
      </button>
      <button
        onClick={() => {
          dispatch({ type: "RESET" });
        }}
      >
        리셋
      </button>
      <hr />
      <p>
        현재 카운터 값은 <b>{state2.value}</b>입니다.
      </p>
      <button
        onClick={() => {
          dispatch2({ type: "INCREMENT" });
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          dispatch2({ type: "DECREMENT" });
        }}
      >
        -1
      </button>
      <button
        onClick={() => {
          dispatch2({ type: "RESET" });
        }}
      >
        리셋
      </button>

      {/* <p>
        현재 카운터 값은 : <b>{value}</b>
      </p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button> */}
    </div>
  );
};

export default Counter;
