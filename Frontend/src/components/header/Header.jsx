import { Link } from 'react-router-dom';
import { RoutesPath } from '../../helpers/routes-path';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { reinitializeApp } from '../../store/slices/app';
import { logout as logoutAction} from '../../store/slices/auth';
import { ReactComponent as Logo } from './../../assert/image/logo.svg'


export const Header = () => {
    var dispatch = useAppDispatch();
    const { isLogin } = useAppSelector((state) => state.authReducer);
    const logout = () => {
        console.log("sasa");
        dispatch(logoutAction())
        dispatch(reinitializeApp())
    }

    return (
        <header className='header'>
            <div className='header-container'>
                <div className='header-logo'>
                    <Logo />
                    <div className='header-logo__title' onClick={()=><Link to={RoutesPath.Home} />}>SmartPlatform</div>
                </div>
                {isLogin && <div className='header-auth'>
                    Добро пожаловать, <span className='header-auth__general'>
                        <span className='header-auth__general-name'>Андрей</span> | <span className='header-auth__logout' onClick={()=>logout()}>Выход</span>
                    </span>
                </div>}
            </div>
        </header>
    )
}