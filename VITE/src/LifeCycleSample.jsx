import React, { Component } from "react";

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  };

  myRef = null;

  // 생성자 함수 -> 초기 state를 정의합니다.
  constructor(props) {
    super(props);
    console.log("constructor");
  }

  // props로 받아온 값을 state와 동기화 시킵니다. 컴포넌트 마운트 될 떄 와 업데이트 될 때 호출
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  // 컴포넌트 만든 후 초기 렌더링을 다 마친 후 수행되는 함수
  componentDidMount() {
    console.log("componentDidMount");
  }

  // props or state가 업데이트 되었을 때, 리렌더링을 할 지 여부를 정하는 함수
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    return nextState.number % 10 !== 4;
  }

  // 컴포넌트를 DOM제거 할때 사용합니다.
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  // 렌더에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출
  getSnapshotBeforeUpdate(prevProps) {
    console.log("getSnapshotBeforeUpdate");
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  // 리렌더링이 완료 된 후 실행
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevProps, prevState);
    if (snapshot) {
      console.log("업데이트 되기 직전 색상 : ", snapshot);
    }
  }

  // 컴포넌트의 모양새를 정의하는 함수
  render() {
    console.log("render");

    const style = {
      color: this.props.color,
    };
    return (
      <div>
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color : {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;
