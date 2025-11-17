import React, { Component } from "react";
import ScrollBox from "./ScrollBox";
import LifeCycleSample from "./LifeCycleSample";

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

class AppClass extends Component {
  state = {
    color: "#000000",
  };

  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };

  render() {
    // const name = "react";
    return (
      <h1>
        {/* {name} */}
        {/* <ScrollBox ref={(ref) => (this.scrollBox = ref)}></ScrollBox>
        <button onClick={() => this.scrollBox.scrollToBottom()}>
          맨 밑으로
        </button> */}
        <button onClick={this.handleClick}>랜덤 색상</button>
        <LifeCycleSample color={this.state.color}></LifeCycleSample>
      </h1>
    );
  }
}

export default AppClass;

// rcc, rsc , rsf

// rcc 클래스 컴포넌트 생성

/*
import React, { Component } from 'react';

class AppCLss extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default AppCLss;
*/

// rsc 화살표 함수형 컴포넌트 생성

/*
import React from 'react';

const AppCLss = () => {
    return (
        <div>
            
        </div>
    );
};

export default AppCLss;
*/

// rsf 함수형 컴포넌트 생성

/*
import React from 'react';

function AppClass(props) {
    return (
        <div>
            
        </div>
    );
}

export default AppClass;
*/
