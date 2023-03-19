import { cn } from '@bem-react/classname';

const deviceInfoPreview = cn('DeviceInfoPreview');

export const deviceInfoPreviewStyle = {
    root: deviceInfoPreview(),
    preview: deviceInfoPreview('Preview'),
    selectContainer: deviceInfoPreview('SelectContainer'),
    select: deviceInfoPreview('Select'),
};
