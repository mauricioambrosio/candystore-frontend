export function sortList(list, field = undefined) {
  if (!list) return list;

  const newList = [...list];
  newList.sort((a, b) => {
    let aField;
    let bField;

    if (field) {
      aField = a[field].toLowerCase();
      bField = b[field].toLowerCase();
    } else {
      aField = a.toLowerCase;
      bField = b.toLowerCase;
    }

    if (aField < bField) return -1;
    if (aField > bField) return 1;
    return 0;
  });
  return newList;
}
