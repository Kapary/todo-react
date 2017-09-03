export const getLowestPossibleId = (items) => {
  let maxId = 0;

  items.forEach(function(item){
    if (item.id > maxId) maxId = item.id;
  });

  return maxId;
};