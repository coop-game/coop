const getUtcTimeStamp = () => {
  const date = new Date();
  const utcTimeStamp = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  return utcTimeStamp;
};
export default getUtcTimeStamp;
