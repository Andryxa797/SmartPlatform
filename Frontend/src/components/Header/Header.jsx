import { Link } from 'react-router-dom';

import { headerStyle as cls } from '@components/Header/Header.const';

import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { reinitializeApp } from '../../store/slices/app';
import { logout as logoutAction } from '../../store/slices/auth';
import { RoutesPath } from '../../utils/routes-path';
import logoSVG from './../../assert/image/logo.svg';
import './Header.scss';

export const Header = () => {
    const dispatch = useAppDispatch();
    const { isLogin } = useAppSelector(state => state.auth);

    const logout = () => {
        dispatch(logoutAction());
        dispatch(reinitializeApp());
    };

    return (
        <header className={cls.root}>
            <div className={cls.container}>
                <div className={cls.logo}>
                    <Link to={RoutesPath.Home}>
                        <img src={logoSVG} className={cls.image} alt="logoSVG" />
                    </Link>
                    <Link to={RoutesPath.Home} className={cls.title}>
                        SmartPlatform
                    </Link>
                </div>
                {isLogin && (
                    <div className={cls.auth}>
                        Добро пожаловать,{' '}
                        <span>
                            <span className={cls.text}>Андрей</span> |{' '}
                            <span className={cls.text} onClick={() => logout()}>
                                Выход
                            </span>
                        </span>
                    </div>
                )}
            </div>
        </header>
    );
};
