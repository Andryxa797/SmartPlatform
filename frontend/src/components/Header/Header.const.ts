import { cn } from '@bem-react/classname';

const header = cn('Header');

export const headerStyle = {
    root: header(),
    container: header('Container'),
    logo: header('Logo'),
    title: header('Title'),
    auth: header('Auth'),
    text: header('Text'),
};
