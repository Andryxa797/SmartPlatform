export const formattedDateString = (date: string) => {
    const dateFormat = new Date(date);
    return `${dateFormat.getDay()}/${dateFormat.getMonth()}/${dateFormat.getFullYear()}`;
};
