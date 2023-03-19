import { cn } from '@bem-react/classname';

const homePage = cn('HomePage');

export const homePageStyle = {
    root: homePage(),
    title: homePage('Title'),
    cardDevices: homePage('CardDevices'),
};
