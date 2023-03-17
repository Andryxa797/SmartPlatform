import { cn } from '@bem-react/classname';

const deviceInfoGeneral = cn('DeviceInfoGeneral');

export const deviceInfoGeneralStyle = {
    root: deviceInfoGeneral(),
    title: deviceInfoGeneral('Title'),
    buttonFirmware: deviceInfoGeneral('ButtonFirmware'),
    date: deviceInfoGeneral('Date'),
    row: deviceInfoGeneral('Row'),
    inputGroup: deviceInfoGeneral('InputGroup'),
    buttonGroup: deviceInfoGeneral('ButtonGroup'),
    button: deviceInfoGeneral('Button'),
};
