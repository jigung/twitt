import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myBase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />

      <footer>&copy; {new Date().getFullYear()} Jisung's Twitt </footer>
    </>
  );
}

export default App;
