export const getRelativeDayNow = (date) => {
  const obtainedDate = new Date(date);
  const currentDate = new Date(Date.now());

  // To ensure that the dates computed were aligned in case if it is on the different time zone
  let utc1 = Date.UTC(
    obtainedDate.getFullYear(),
    obtainedDate.getMonth(),
    obtainedDate.getDate()
  );
  let utc2 = Date.UTC(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  // Calculate the time difference in milliseconds
  let timeDiff = Math.abs(utc2 - utc1);

  // Convert milliseconds to days
  let daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
};
