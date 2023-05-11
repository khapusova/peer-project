export const phoneFormat = (input) => {
  let result = input.replace(/\D/g, '');
  result = result.substring(0, 10);
  const size = result.length;
  if (size < 4 && size > 0) {
    result = `(${result}`;
  } else if (size < 6) {
    result = `(${result.substring(0, 3)}) - ${result.substring(3, 5)}`;
  } else if (size < 8) {
    result = `(${result.substring(0, 3)}) - ${result.substring(
      3,
      5
    )} - ${result.substring(5, 7)}`;
  } else {
    result = `(${result.substring(0, 3)}) - ${result.substring(
      3,
      5
    )} - ${result.substring(5, 7)} - ${result.substring(7, 10)}`;
  }
  return result;
};
