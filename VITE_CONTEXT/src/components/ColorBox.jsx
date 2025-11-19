import React, { useContext } from "react";
import ColorContext from "../contexts/color";
import { ColorConsumer } from "../contexts/color";

const ColorBox = () => {
  const { state } = useContext(ColorContext);
  return (
    // <ColorContext.Consumer>
    //   {(value) => (
    //     <div
    //       style={{
    //         width: "64px",
    //         height: "64px",
    //         background: value.color,
    //       }}
    //     ></div>
    //   )}
    // </ColorContext.Consumer>

    // <ColorConsumer>
    //   {({ state }) => (
    //     <>
    //       <div
    //         style={{
    //           width: "64px",
    //           height: "64px",
    //           background: state.color,
    //         }}
    //       ></div>
    //       <div
    //         style={{
    //           width: "32px",
    //           height: "32px",
    //           background: state.subcolor,
    //         }}
    //       ></div>
    //     </>
    //   )}
    // </ColorConsumer>

    <>
      <div
        style={{
          width: "64px",
          height: "64px",
          background: state.color,
        }}
      ></div>
      <div
        style={{
          width: "32px",
          height: "32px",
          background: state.subcolor,
        }}
      ></div>
    </>
  );
};

export default ColorBox;
