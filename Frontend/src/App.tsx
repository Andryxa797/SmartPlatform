import React, { useEffect } from "react";
import { Auth } from "./components/auth/Auth";
import "antd/dist/antd.css";
import { useAppDispatch, useAppSelector } from "./store/hooks/hooks";

import { logout } from "./store/slices/auth";
import { initAppAsync } from "./store/slices/app";

function App() {
  var dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.authReducer);
  const { initApp } = useAppSelector((state) => state.appReducer);
  
  useEffect(() => {
    if (!initApp) dispatch(initAppAsync());
  }, []);

  if (!isLogin) return <Auth />;
  return (
    <div className="App">
      Авторизован
      <button onClick={() => dispatch(logout())}>Выйти</button>
    </div>
  );
}

export default App;
