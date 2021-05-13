import React from "react";

// css
import "./App.css";

// components
import Root from "./components/root";

// UserProvider
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <Root />
    </UserProvider>
  );
}

export default App;
