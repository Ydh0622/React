import React, { Component } from "react";
// state 컴포넌트 내부에서 바뀔 수 있는 값을 의미
// props 는 부모요소가 설정하는 값 읽기만 가능

class Counter extends Component {
  //   constructor(props) {
  //     super(props);
  //     // state의 초깃값 설정하기
  //     this.state = {
  //       number: 0,
  //       fixedNumber: 0,
  //     };
  //   }

  state = {
    number: 0,
    fixedNumber: 0,
  };

  render() {
    const { number, fixedNumber } = this.state; // state를 조회할 때 this.state로 조회합니다.
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값 : {fixedNumber} </h2>
        <button
          // onClick을 통해 버튼이 클릭될 때 호출함 함수를 지정
          onClick={() => {
            // this.setState를 사용하면 state에 새로운 값을 넣을 수 있음
            // this.setState({ number: number + 1 });
            // this.setState({ number: this.state.number + 1 });
            // this.setState((prevState) => {
            //   return {
            //     number: prevState.number + 1,
            //   };
            // });
            // // 위 코드와 아래코드는 완전히 똑같은 기능입니다.
            // // 아래 코드는 함수에서 바로 객체를 반환합니다.
            this.setState((prevState) => ({
              number: prevState.number + 1,
            }));
            this.setState(
              {
                number: number + 1,
              },
              () => {
                console.log("방금 setState가 호출되었습니다.");
                console.log(this.state);
              }
            );
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
