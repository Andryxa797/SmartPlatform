import { useEffect } from "react";
import { Auth } from "./components/auth/Auth";
import { useAppDispatch, useAppSelector } from "./store/hooks/hooks";
import { initAppAsync } from "./store/slices/app";
import { Preloader } from "./components/UI/Preloader/Preloader";
import { Header } from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/Home";
import { RoutesPath } from "./helpers/routes-path";
import { Device } from "./components/device/Device";

function App() {
  var dispatch = useAppDispatch();
  
  const { isLogin } = useAppSelector((state) => state.authReducer);
  const { initApp, loading } = useAppSelector((state) => state.appReducer);

  useEffect(() => {
    if (!initApp) dispatch(initAppAsync());
  }, [initApp, dispatch]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : !isLogin ? (
        <>
          <Header />
          <Auth />
        </>
      ) : (
        <>
          <Header />
          <div className="App">
            <Routes>
              <Route path={RoutesPath.Home} element={<Home />} />
              <Route path={RoutesPath.Device} element={<Device />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
}
export default App;
