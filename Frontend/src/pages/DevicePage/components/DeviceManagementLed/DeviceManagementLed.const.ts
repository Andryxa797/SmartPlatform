import { cn } from '@bem-react/classname';

const deviceManagementLed = cn('DeviceManagementLed');

export const deviceManagementLedStyle = {
    root: deviceManagementLed(),
    title: deviceManagementLed('Title'),
    stationConnect: deviceManagementLed('StationConnect'),
    stationConnectState: deviceManagementLed('StationConnectState'),
    buttonsWrapper: deviceManagementLed('ButtonsWrapper'),
    button: deviceManagementLed('Button'),
};
