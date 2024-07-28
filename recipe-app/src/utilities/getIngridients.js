export default function getIngridients(meal) {
  const ingridients = [];
  for (let i = 1; meal[getOrderedKey("strIngredient", i)]; i++) {
    ingridients.push(meal[getOrderedKey("strIngredient", i)]);
  }
  return ingridients;
}

function getOrderedKey(key, index) {
  return `${key}${index}`;
}
