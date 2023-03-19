import 'react';

import { preloaderStyle as cls } from '@components/Preloader/Preloader.const';

import preloaderSVG from './../../assert/image/preloader.svg';
import './Preloader.scss';

export const Preloader = () => {
    return (
        <div className={cls.root}>
            <img src={preloaderSVG} className={cls.image} alt="Preloader" />
        </div>
    );
};
