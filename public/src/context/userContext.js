import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user_data, setuser_data] = useState({
    logIn_state: false, // get from localStorage
    name: "",
    userName: "",
    id: "",
    img: undefined,
    like: [],
    book: [],
    buy: [],
  });

  return (
    <UserContext.Provider value={[user_data, setuser_data]}>
      {props.children}
    </UserContext.Provider>
  );
};
