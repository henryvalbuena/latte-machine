import React, { useRef } from "react";

import styles from "./LatteModal.module.css";

function LatteModalIngredient(props) {
  // const nodes = {
  //   ingredient: useRef(null),
  //   parts: useRef(null),
  //   color: useRef(null)
  // }

  return (
    <div className={styles.lableBox}>
      <label className={styles.labels}>Ingredient Name</label>
      <input
        className={styles.inputs}
        type="text"
        id="ingredient"
        name="ingredient"
      />
      <label className={styles.labels}>Parts</label>
      <select id="parts" name="parts">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <label className={styles.labels}>Color</label>
      <input className={styles.inputs} type="color" id="color" name="color" />
      <span className={styles.btns} onClick={() => props.remove(props.id)}>
        <i className={[styles.icon, styles.red, "material-icons"].join(" ")}>
          close
        </i>
      </span>
      <span className={styles.btns} onClick={() => props.add()}>
        <i className={[styles.icon, "material-icons"].join(" ")}>add</i>
      </span>
    </div>
  );
}

export default LatteModalIngredient;
