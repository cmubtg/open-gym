export const startOfDay = (date: Date) => {
    return new Date(date.setHours(0, 0, 0, 0));
};

export const dateInFuture = (currentDate: Date, k: number) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + k);
    return date;
};
