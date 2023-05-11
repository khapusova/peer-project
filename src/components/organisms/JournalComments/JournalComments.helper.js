export const getTotalCommentsQuantity = (comments) => {
  const commentsQuantity = comments?.length || 0;
  const sumWithInitial = comments
    .map((el) => el?.replies?.length || 0)
    .reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      commentsQuantity
    );
  return sumWithInitial;
};
