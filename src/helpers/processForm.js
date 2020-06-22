function processForm(payload) {
  const { ingredientName, parts, color, latteName } = payload;
  let parsedPayload = {
    title: latteName.value,
    ingredients: [
      {
        name: null,
        parts: null,
        color: null,
      },
    ],
  };
  // Two options, is one object or is an array
  if (isIterable(ingredientName)) {
    parsedPayload.ingredients = getObj(ingredientName, parts, color);
  } else {
    parsedPayload.ingredients[0].name = ingredientName.value;
    parsedPayload.ingredients[0].parts = parseInt(parts.value);
    parsedPayload.ingredients[0].color = color.value;
  }
  return parsedPayload;
}

function isIterable(obj) {
  return typeof obj[Symbol.iterator] === "function";
}

function getObj(n, p, c) {
  let obj = [];
  for (let x = 0; x < n.length; x++) {
    obj.push({
      name: n[x].value,
      parts: p[x].value,
      color: c[x].value,
    });
  }
  return obj;
}

export default processForm;
