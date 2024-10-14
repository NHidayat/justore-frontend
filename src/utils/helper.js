import dayjs from 'dayjs';

export const formatDecimal = (number) => {
  return Math.round(number * 100) / 100;
};

export const getErrorResponseMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data.error ||
    error?.response?.data ||
    error?.message ||
    error.toString()
  );
};

export const formatDate = (date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(format);
};
