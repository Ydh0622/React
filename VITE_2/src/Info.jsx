import React, { useEffect, useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const Info = () => {
  const [infoState, infoDispatch] = useReducer(reducer, {
    name: "",
    nickname: "",
  });

  const [addressState, addressDispatch] = useReducer(reducer, {
    city: "",
    code: "",
  });

  const { name, nickname } = infoState;
  const { city, code } = addressState;

  const onChangeInfo = (e) => {
    infoDispatch(e.target);
  };

  const onChangeAddress = (e) => {
    addressDispatch(e.target);
  };

  //   const [name, setName] = useState("");
  //   const [nickname, setNickName] = useState("");

  // 렌더링 될 때 마다
  //   useEffect(() => {
  //     console.log("렌더링이 완료되었다.");
  //     console.log({ name, nickname });
  //   });

  // 초기 렌더링(마운트) 될 때만
  //   useEffect(() => {
  //     console.log("마운트 될 때만 실행");
  //   }, []);

  // 타겟 값(ex .name)이 업데이트 될 때만
  //   useEffect(() => {
  //     console.log(name + "Hi");
  //   }, [name]);

  // 언마운트 될 때만
  //   useEffect(() => {
  //     console.log("effect");
  //     console.log(name);
  //     return () => {
  //       console.log("cleanup");
  //       console.log(name);
  //     };
  //   }, [name]);

  //   const onChangeName = (e) => {
  //     setName(e.target.value);
  //   };

  //   const onChangeNickName = (e) => {
  //     setNickName(e.target.value);
  //   };

  return (
    <div>
      <div>
        <h2>이름, 닉네임</h2>
        <div>
          <input name="name" value={name} onChange={onChangeInfo}></input>
          <input
            name="nickname"
            value={nickname}
            onChange={onChangeInfo}
          ></input>
          {/* <input value={name} onChange={onChangeName}></input>
        <input value={nickname} onChange={onChangeNickName}></input> */}
        </div>
        <div>
          <div>
            <b>이름 : </b> {name}
          </div>
          <div>
            <b>닉네임 : </b> {nickname}
          </div>
        </div>
      </div>
      <div>
        <h2>도시, 주소</h2>
        <div>
          <input name="city" value={city} onChange={onChangeAddress}></input>
          <input name="code" value={code} onChange={onChangeAddress}></input>
        </div>
        <div>
          <div>
            <b>도시 : </b> {city}
          </div>
          <div>
            <b>주소 : </b> {code}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
