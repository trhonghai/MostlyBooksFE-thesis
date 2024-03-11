export const formatDate = (date) => {
  const orderDate = new Date(date);
  const year = orderDate.getFullYear();
  const month = orderDate.getMonth() + 1;
  const day = orderDate.getDate();
  const dateAlreadyFormat = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  return dateAlreadyFormat;
};
