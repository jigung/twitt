// from react 는 라이브러리. 앞에는 그 from 에 있는 속에 함수를 부르는 것임....
import React, { useState } from "react";
import { authService, firebaseInstance } from "myBase";
import styled from "styled-components";

// usestate 이메일, 패스워드 입력.
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState("ture");
  const [error, setError] = useState("");
  //onchange = 칠때마다 반응하게 만든다. 뭐를 ? target을.
  //타겟 안엔 네임, 밸류를 넣어놧음. 이 이벤트를 인식해서 if문 대로 간다.

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  // 온서브밋 폼의 값을 전송하기 전에 어떤 작업을 하게 만들기.
  // 쉽게 말하면 로그인 하기전에 비번 아이디 맞는지 틀린지 확인 검수 가능하다는거
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // 계정을 생성하기 async랑 await는 붙어있는 존재 (promise문)
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);

        // 로그인
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSociaClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />

        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? " Sign in." : "Create Account"}
      </span>
      <div>
        <button onClick={onSociaClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSociaClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
