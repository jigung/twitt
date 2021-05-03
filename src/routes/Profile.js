import React from "react";
import { authService } from "myBase";
import { useHistory } from "react-router";

export default () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log OuT</button>
    </>
  );
};
