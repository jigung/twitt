// from react 는 라이브러리. 앞에는 그 from 에 있는 속에 함수를 부르는 것임....
import React, { useState } from "react";

// usestate 이메일, 패스워드 입력.
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const onSubmit = (event) => {
    event.preventDefault();
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

        <input type="submit" value="Log In" />
      </form>

      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
