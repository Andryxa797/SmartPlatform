import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from '@components/Header/Header';
import { Preloader } from '@components/Preloader/Preloader';
import { AuthPage } from '@pages/AuthPage/AuthPageLogin';
import { DevicePage } from '@pages/DevicePage/DevicePage';
import { HomePage } from '@pages/HomePage/HomePage';
import { useAppDispatch, useAppSelector } from '@store/hooks/hooks';
import { initAppAsync } from '@store/slices/app';
import { RoutesPath } from '@utils/routes-path';

import './App.scss';

function App() {
    const dispatch = useAppDispatch();
    const { isLogin } = useAppSelector(state => state.auth);
    const { initApp, loading } = useAppSelector(state => state.app);

    useEffect(() => {
        if (!initApp) {
            dispatch(initAppAsync());
        }
    }, [initApp, dispatch]);

    if (loading) {
        return <Preloader />;
    }

    if (!isLogin) {
        return (
            <>
                <Header />
                <AuthPage />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="App">
                <Routes>
                    <Route path={RoutesPath.Home} element={<HomePage />} />
                    <Route path={RoutesPath.Device} element={<DevicePage />} />
                </Routes>
            </div>
        </>
    );
}
export default App;
