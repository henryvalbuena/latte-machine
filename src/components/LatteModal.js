import React, { Component } from "react";

import LatteModalIngredient from "./LatteModalIngredient";

import styles from "./LatteModal.module.css";

class LatteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableRmv: true,
      disableAdd: false,
      ingredientKeyCounter: 1,
      ingredients: [],
    };
    this.state.ingredients.push(
      <LatteModalIngredient
        key={this.state.ingredientKeyCounter}
        ingredient={{}}
        add={this.handleAddIngredient.bind(this)}
        remove={this.handleRemoveIngredient.bind(this)}
        id={this.state.ingredientKeyCounter}
      />
    );
  }

  handleAddIngredient() {
    if (!this.state.disableAdd) {
      let state = { ...this.state };
      let ingredients = [...state.ingredients];
      state.ingredientKeyCounter += 1;
      ingredients.push(
        <LatteModalIngredient
          key={state.ingredientKeyCounter}
          ingredient={ingredients}
          add={this.handleAddIngredient.bind(this)}
          remove={this.handleRemoveIngredient.bind(this)}
          id={state.ingredientKeyCounter}
        />
      );
      state.ingredients = ingredients;
      if (state.ingredients.length >= 4) state.disableAdd = true;
      state.disableRmv = false;
      this.setState(state);
    } else {
      console.log("Limit reached");
    }
  }

  handleRemoveIngredient(id) {
    if (!this.state.disableRmv) {
      let state = { ...this.state };
      let ingredients = [...state.ingredients];
      let newIngredients = ingredients.filter((ele) => ele.key !== `${id}`);
      if (newIngredients.length <= 1) state.disableRmv = true;
      state.disableAdd = false;
      state.ingredients = newIngredients;
      this.setState(state);
      console.log("Remove", id);
    } else {
      console.log("Cannot remove");
    }
  }

  render() {
    const nextLatte = this.props;

    let isEdit = nextLatte.editMode;
    let latteTitle = isEdit ? nextLatte.latte.title : "";
    let latteId = isEdit ? nextLatte.latte.id : null;
    let title = isEdit ? `Edit ${latteTitle}` : "Create Latte";

    let nextIngredients = () => {
      let list = [];
      if (isEdit) {
        let latteModalIngredientKey = 0;
        for (let latte of nextLatte.latte.ingredients) {
          list.push(
            <LatteModalIngredient
              key={latteModalIngredientKey}
              ingredient={latte}
              add={this.handleAddIngredient.bind(this)}
              remove={this.handleRemoveIngredient.bind(this)}
              id={latteModalIngredientKey}
            />
          );
          latteModalIngredientKey++;
        }
        return list;
      } else {
        return this.state.ingredients;
      }
    };

    return (
      <div
        style={{ display: this.props.display ? "block" : "none" }}
        className={styles.modalContainer}
      >
        <div className={styles.modalContent}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.preview}></div>
          <form
            className={styles.form}
            onSubmit={(event) => this.props.handleForm(event)}
          >
            <div className={styles.latteName}>
              <label className={styles.labels}>Latte Name</label>
              <input
                className={styles.inputs}
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
              onClick={() => this.props.removeLatte(latteId)}
              type="button"
            >
              DELETE
            </button>
            <button
              className={styles.btns}
              onClick={() => this.props.closeModal()}
              type="button"
            >
              CANCEL
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LatteModal;
