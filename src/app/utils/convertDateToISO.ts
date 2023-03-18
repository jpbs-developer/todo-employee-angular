export const converStringToISO8601 = (date: string): string => {
  if (date.includes('-')) return date;

  const day = date.slice(0, 2);
  const month = date.slice(2, 4);
  const year = date.slice(4, date.length);

  return `${year}-${month}-${day}`;
};
