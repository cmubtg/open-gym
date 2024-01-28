export const startOfDay = (date: Date) => {
  return new Date(date.setHours(0, 0, 0, 0));
};

export const endOfDay = (date: Date) => {
  return new Date(date.setUTCHours(23, 59, 59, 999));
};

export const dateInFuture = (currentDate: Date, k: number) => {
  const date = new Date(currentDate);
  date.setDate(currentDate.getDate() + k);
  return date;
};

export const startOfWeek = (date: Date) => {
  return new Date(date.setDate(date.getDate() - date.getDay()));
};
