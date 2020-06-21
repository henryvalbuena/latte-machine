function processForm(payload) {
  const { ingredient, parts, color, latteName } = payload;
  let parsedPayload = {
    name: latteName.value,
    ingredients: [
      {
        ingredient: null,
        parts: null,
        color: null,
      },
    ],
  };
  // Two options, is one object or is an array
  if (isIterable(ingredient)) {
    parsedPayload.ingredients = getObj(ingredient, parts, color);
  } else {
    parsedPayload.ingredients[0].ingredient = ingredient.value;
    parsedPayload.ingredients[0].parts = parts.value;
    parsedPayload.ingredients[0].color = color.value;
  }
  return parsedPayload;
}

function isIterable(obj) {
  return typeof obj[Symbol.iterator] === "function";
}

function getObj(i, p, c) {
  let obj = [];
  for (let x = 0; x < i.length; x++) {
    obj.push({
      ingredient: i[x].value,
      parts: p[x].value,
      color: c[x].value,
    });
  }
  return obj;
}

export default processForm;
