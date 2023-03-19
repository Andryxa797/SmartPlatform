import { cn } from '@bem-react/classname';

const deviceStationConnect = cn('DeviceStationConnect');

export const deviceStationConnectStyle = {
    root: deviceStationConnect(),
    title: deviceStationConnect('Title'),
    stationConnect: deviceStationConnect('StationConnect'),
    stationConnectState: deviceStationConnect('StationConnectState'),
};
