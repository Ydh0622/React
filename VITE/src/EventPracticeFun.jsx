import React, { useState } from "react";

const EventPracticeFun = () => {
  const [form, setForm] = useState({
    username: "",
    message: "",
    age: "",
  });

  const { username, message, age } = form;
  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  //   const [username, setUsername] = useState("");
  //   const [message, setMessage] = useState("");
  //   const onChangeUsername = (e) => setUsername(e.target.value);
  //   const onChangeMessage = (e) => setMessage(e.target.value);

  const onClick = () => {
    alert(username + " : " + message + " : " + age);
    setForm({
      username: "",
      message: "",
      age: "",
    });

    // setUsername("");
    // setMessage("");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <div>
      <h1>이벤트 연습2</h1>
      <input
        type="text"
        name="username"
        placeholder="이름을 입력해 주세요"
        value={username}
        onChange={onChange}
        // onChange={onChangeUsername}
      ></input>
      <br />
      <input
        type="text"
        name="message"
        placeholder="내용을 입력해 주세요"
        value={message}
        onChange={onChange}
        // onChange={onChangeMessage}
      ></input>
      <br />
      <input
        type="text"
        name="age"
        placeholder="나이를 입력해 주세요"
        value={age}
        onChange={onChange}
        onKeyDown={onKeyPress}
      ></input>
      <br />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPracticeFun;
