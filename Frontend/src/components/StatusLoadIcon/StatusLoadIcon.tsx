import { CheckOutlined, LoadingOutlined, StopOutlined } from '@ant-design/icons';

interface IStatusLoadIcon {
    status: 'success' | 'loading' | 'error';
}
export const StatusLoadIcon = ({ status }: IStatusLoadIcon) => {
    if (status === 'success') {
        return <CheckOutlined color="green" />;
    }
    if (status === 'loading') {
        return <LoadingOutlined />;
    }

    return <StopOutlined color="red" />;
};
