interface IFormattedDateStringArgs {
    date: string;
    withDate?: boolean;
    withTime?: boolean;
}
export const formattedDateString = ({ date, withTime = false, withDate = true }: IFormattedDateStringArgs) => {
    const dateFormat = new Date(date);
    const dateStr = withDate ? `${dateFormat.getDay()}/${dateFormat.getMonth()}/${dateFormat.getFullYear()}` : '';

    const hours = dateFormat.getHours() > 9 ? dateFormat.getHours() : '0' + dateFormat.getHours();
    const minutes = dateFormat.getMinutes() > 9 ? dateFormat.getMinutes() : '0' + dateFormat.getMinutes();
    const timeStr = withTime ? ` ${hours}:${minutes}` : '';

    return dateStr + timeStr;
};
