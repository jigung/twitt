import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "myBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        //유저 로그인 트루면 로그인 되는거고 아니면 로그인 안댐~ USER를 받아야댐
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <div>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initaializing..."
      )}

      <footer>&copy; {new Date().getFullYear()} Jisung's Twitt </footer>
    </div>
  );
}

export default App;
