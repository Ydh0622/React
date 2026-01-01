import Counter from "../components/Counter";
import React from "react";
// import { connect } from "react-redux";
import { decrease, increase } from "../modules/counter";
// import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

// 1번 방법
// const mapStateToProps = (state) => ({
//   number: state.counter.number,
// });

// const mapDispatchToProps = (dispatch) => ({
//   // 임시 함수
//   increase: () => {
//     // console.log("increase");
//     dispatch(increase());
//   },
//   decrease: () => {
//     // console.log("decrease");
//     dispatch(decrease());
//   },
// });

export default CounterContainer;

// connect(
//   // mapStateToProps, mapDispatchToProps
//   (state) => ({
//     number: state.counter.number,
//   }),

//   // 2번 방법
//   //   (dispatch) => ({
//   //     increase: () => dispatch(increase()),
//   //     decrease: () => dispatch(decrease()),
//   //   })

//   // 3번 방법
//   //   (dispatch) => bindActionCreators({ increase, decrease }, dispatch)

//   // 4번 방법
//   { increase, decrease }
// )(CounterContainer);
