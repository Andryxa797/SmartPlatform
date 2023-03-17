import { cn } from '@bem-react/classname';

const devicePage = cn('DevicePage');

export const devicePageStyle = {
    root: devicePage(),
    info: devicePage('Info'),
};
