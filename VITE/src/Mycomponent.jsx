import React from "react";

const MyComponent = ({ name, age, children }) => {
  return (
    <div>
      나의 새롭고 멋진 {name} {age} {children} 컴포넌트
    </div>
  );
};

// MyComponent.defaultProps = {
//   name: "기본 이름",
// }; -> 이 방법은 더 이상 쓰이지 않음
// <div>나의 멋지고 새로운 {props.name || "하이"}컴포넌트</div> => 비구조화 할당
// const MyComponent = ({ name = "Hi", children }) => 구조화 할당

// MyComponent.propTypes = {
//   name: PropTypes.string,
//   age: PropTypes.number.isRequired,
// };

export default MyComponent;
