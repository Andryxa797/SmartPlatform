import { cn } from '@bem-react/classname';

const authPage = cn('AuthPageLogin');

export const authPageStyle = {
    root: authPage(),
    title: authPage('Title'),
    container: authPage('Container'),
    button: authPage('Button'),
};
