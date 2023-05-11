export const organizedToRows = (numOfCatsInOneRow, initialList) => {
  let list = initialList;
  const result = [];

  while (list.length > 0) {
    const sublist =
      list.length > numOfCatsInOneRow ? list.slice(0, numOfCatsInOneRow) : list;
    list = list.slice(sublist.length);
    result.push(sublist);
  }

  return result;
};
