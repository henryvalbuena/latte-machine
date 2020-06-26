import React from "react";

import LatteModalIngredientList from "./LatteModalIngredientList";

import styles from "./LatteModal.module.css";

function LatteModal(props) {
  const nextLatte = props;

  let isEdit = nextLatte.editMode;
  let latteTitle = isEdit ? nextLatte.latte.title : "";
  let latteId = isEdit ? nextLatte.latte.id : null;
  let title = isEdit ? `Edit ${latteTitle}` : "Create Latte";

  let nextIngredients = () => {
    if (isEdit) {
      return <LatteModalIngredientList latte={nextLatte.latte} />;
    } else {
      return <LatteModalIngredientList />;
    }
  };

  return (
    <div
      style={{ display: props.display ? "block" : "none" }}
      className={styles.modalContainer}
    >
      <div className={styles.modalContent}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.preview}></div>
        <form
          className={styles.form}
          onSubmit={(event) => props.handleForm(event)}
        >
          <div className={styles.latteName}>
            <label className={styles.labels}>Latte Name</label>
            <input
              className={[styles.inputs, styles.inputName].join(" ")}
              type="text"
              id="latteName"
              name="latteName"
              defaultValue={latteTitle}
            />
          </div>
          {nextIngredients()}
          <button className={styles.btns} type="submit">
            SAVE
          </button>
          <button
            className={[styles.btns, styles.red].join(" ")}
            onClick={() => props.removeLatte(latteId)}
            type="button"
          >
            DELETE
          </button>
          <button
            className={[styles.btns, styles.cancel].join(" ")}
            onClick={() => props.closeModal()}
            type="button"
          >
            CANCEL
          </button>
        </form>
      </div>
    </div>
  );
}

export default LatteModal;
