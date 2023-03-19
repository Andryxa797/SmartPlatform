import { cn } from '@bem-react/classname';

const homeDeviceCard = cn('HomeDeviceCard');

export const homeDeviceCardStyle = {
    root: homeDeviceCard(),
    previewLink: homeDeviceCard('PreviewLink'),
    preview: homeDeviceCard('Preview'),
    title: homeDeviceCard('Title'),
    buttons: homeDeviceCard('Buttons'),
    buttonsItem: homeDeviceCard('ButtonsItem'),
    сreateContainer: homeDeviceCard('CreateContainer'),
    icon: homeDeviceCard('Icon'),
    createTitle: homeDeviceCard('CreateTitle'),
};
