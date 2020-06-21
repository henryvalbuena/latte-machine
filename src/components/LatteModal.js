import React, { Component } from "react";

import LatteModalIngredient from "./LatteModalIngredient";

import styles from "./LatteModal.module.css";

class LatteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initState();
  }

  initState() {
    let { latte } = this.props;
    let state = {
      title: latte ? `Edit ${latte.name}` : "Create Latte",
      latteName: "",
      disableRmv: true,
      disableAdd: false,
      ingredientKey: 1,
      ingredients: [],
    };
    state.ingredients.push(
      <LatteModalIngredient
        key={state.ingredientKey}
        ingredients={[]}
        add={this.handleAddIngredient.bind(this)}
        remove={this.handleRemoveIngredient.bind(this)}
        id={state.ingredientKey}
      />
    );
    this.setState(state);
  }

  handleAddIngredient() {
    if (!this.state.disableAdd) {
      let state = { ...this.state };
      let ingredients = [...state.ingredients];
      ingredients.push(
        <LatteModalIngredient
          key={++state.ingredientKey}
          ingredients={ingredients}
          add={this.handleAddIngredient.bind(this)}
          remove={this.handleRemoveIngredient.bind(this)}
          id={state.ingredientKey}
        />
      );
      state.ingredients = ingredients;
      if (state.ingredients.length >= 4) state.disableAdd = true;
      state.disableRmv = false;
      this.setState(state);
      console.log("Add", state.ingredientKey);
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

  closeModal() {
    this.props.closeModal();
    this.initState();
  }

  render() {
    return (
      <div
        style={{ display: this.props.display ? "block" : "none" }}
        className={styles.modalContainer}
      >
        <div className={styles.modalContent}>
          <h2 className={styles.title}>{this.state.title}</h2>
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
                value={this.latteName}
              />
            </div>
            {this.state.ingredients}
            <button className={styles.btns} type="submit">
              SAVE
            </button>
            <button
              className={[styles.btns, styles.red].join(" ")}
              type="button"
            >
              DELETE
            </button>
            <button
              className={styles.btns}
              onClick={() => this.closeModal()}
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
