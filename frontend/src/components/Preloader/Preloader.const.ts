import { cn } from '@bem-react/classname';

const preloader = cn('Preloader');

export const preloaderStyle = {
    root: preloader(),
    image: preloader('Image'),
};
