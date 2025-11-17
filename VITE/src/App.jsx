import "./App.css";
import AppClass from "./AppClass";
import MyComponent from "./MyComponent";
import MyComponentClass from "./MyComponentClass";
import Counter from "./Counter";
import Say from "./Say";
import EventPractice from "./EventPractice";
import EventPracticeFun from "./EventPracticeFun";
import ValidationSample from "./ValidationSample";
import ScrollBox from "./ScrollBox";
import IterationSample from "./IterationSample";

function App() {
  // const name = "React";
  // const name2 = undefined;

  // if 문
  // let content;

  // if (name === "React") {
  //   content = <h1>React is True</h1>;
  // } else {
  //   content = <h2>React is False</h2>;
  // }

  // 인라인 스타일을 미리 선언하는 방법
  // const style = {
  //   backgroundColor: "black",
  //   color: "aqua",
  //   fontSize: "48px",
  //   fontWeight: "bold",
  //   padding: "16",
  // };

  /*
  인라인 스타일을 미리 선언하는 방법
  const style = {
    backgroundColor: "black",
    color: "aqua",
    fontSize: "48px",
    fontWeight: "bold",
    padding: "16",
  };
  */
  return (
    <>
      {/* 요소 여러 개가 있을 경우 부모 요소 하나에 감싸져 있어야 한다 */}
      {/* <h1>React</h1>
      <h2>Hello</h2> */}

      {/* 자바스크립트 표현 */}
      {/* <h1>{name} Hello</h1> */}

      {/* if 문 대신 조건부 연산자 (삼항연사자) 조건 ? 참 : 거짓 */}
      {/* {name === "React" ? <h1> React is true</h1> : <h2> React is false</h2>} */}

      {/* if 문 */}
      {/* {content} */}

      {/* AND 연산자&&를 사용한 조건부 렌더링  */}
      {/* {name === "React" && <h1> React is true</h1>} */}

      {/* Undefined를 렌더링하지 않기 */}
      {/* {name2} || "React is Undefined" */}

      {/* 인라인 스타일 미리 선언하고 쓰는 방법 */}
      {/* <div style={style}>React</div> */}

      {/* 인라인 스타일 미리 선언하지 않고 쓰는 방법 */}
      {/* <div
        style={{
          backgroundColor: "black",
          color: "aqua",
          fontSize: "48px",
          fontWeight: "bold",
          padding: "16",
        }}
      >
        {name}
      </div> */}

      {/* className 을 사용한 방법 */}
      {/* <div className="react">{name}</div> */}

      {/* 셀프클로징 태그 */}
      {/* <div> {name} </div>
      <br />
      <input /> */}

      {/* class방식 */}
      <AppClass></AppClass>

      {/* props 와 children */}
      {/* <MyComponent name={12} age="hi"></MyComponent> */}
      {/* <MyComponent name="hi" /> */}
      {/* <MyComponentClass
        name="hi"
        children="10"
        favoriteNumber="30"
      ></MyComponentClass> */}

      {/* <Counter /> */}
      {/* <Say></Say> */}

      {/* Class 컴포넌트 이벤트 핸들링 */}
      {/* <EventPractice></EventPractice> */}

      {/* 화살표 함수 컴포넌트 이벤트 핸들링 */}
      {/* <EventPracticeFun></EventPracticeFun> */}

      {/* <ValidationSample></ValidationSample> */}

      {/* <ScrollBox ref={(ref) => (this.scrollBox = ref)}></ScrollBox>
      <button onClick={() => this.scrollBox.scrollToBottom()}>맨 밑으로</button> */}

      {/* <IterationSample></IterationSample> */}
    </>
  );
}

export default App;
