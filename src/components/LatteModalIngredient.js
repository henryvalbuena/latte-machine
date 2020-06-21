import React from "react";

import styles from "./LatteModal.module.css";

function LatteModalIngredient({ingredient, add, remove, id}) {
  return (
    <div className={styles.lableBox}>
      <label className={styles.labels}>Ingredient Name</label>
      <input
        className={styles.inputs}
        type="text"
        name="ingredient"
        defaultValue={ingredient.ingredient}
      />
      <label className={styles.labels}>Parts</label>
      <select name="parts" defaultValue={ingredient.parts}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <label className={styles.labels}>Color</label>
      <input className={styles.inputs} type="color" name="color" defaultValue={ingredient.color} />
      <span className={styles.btns} onClick={() => remove(id)}>
        <i className={[styles.icon, styles.red, "material-icons"].join(" ")}>
          close
        </i>
      </span>
      <span className={styles.btns} onClick={() => add()}>
        <i className={[styles.icon, "material-icons"].join(" ")}>add</i>
      </span>
    </div>
  );
}

export default LatteModalIngredient;
