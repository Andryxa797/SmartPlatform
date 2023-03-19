import { cn } from '@bem-react/classname';

const deviceFrimwareModal = cn('DeviceFrimwareModal');

export const deviceFrimwareModalStyle = {
    root: deviceFrimwareModal(),
    list: deviceFrimwareModal('List'),
    listItem: deviceFrimwareModal('ListItem'),
    buttonsGroup: deviceFrimwareModal('ButtonsGroup'),
    buttonsGroupItem: deviceFrimwareModal('ButtonsGroupsItem'),
    button: deviceFrimwareModal('Button'),
};
