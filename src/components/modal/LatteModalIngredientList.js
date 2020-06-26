import React, { Component } from "react";

import LatteModalIngredient from "./LatteModalIngredient";

class LatteModalIngredientList extends Component {
  constructor(props) {
    super(props);
    let newList = [];
    let counter = 0;
    const latte = props.latte;
    if (latte) {
      newList = latte.ingredients.map((l, i) => {
        return (
          <LatteModalIngredient
            key={i}
            ingredient={l}
            add={this.add}
            remove={this.remove}
            id={i}
          />
        );
      });
      counter = newList.length - 1;
    } else {
      const id = this.idGenerator();
      newList.push(
        <LatteModalIngredient
          key={id}
          ingredient={{}}
          add={this.add}
          remove={this.remove}
          id={id}
        />
      );
    }
    this.maxIngredients = 3;
    this.state = {
      list: newList,
      counter: counter,
    };
  }

  idGenerator = () => {
    return Math.floor(Math.random() * 9999);
  };

  add = () => {
    if (this.state.counter < this.maxIngredients) {
      let newList = [...this.state.list];
      const id = this.idGenerator();
      newList.push(
        <LatteModalIngredient
          key={id}
          ingredient={{}}
          add={this.add}
          remove={this.remove}
          id={id}
        />
      );
      this.setState({
        list: newList,
        counter: this.state.counter + 1,
      });
    }
  };

  remove = (id) => {
    if (this.state.counter > 0) {
      const index = this.state.list.findIndex(
        (l) => parseInt(l.key) === parseInt(id)
      );
      if (index >= 0) {
        let newList = [...this.state.list];
        newList.splice(index, 1);
        this.setState({
          list: newList,
          counter: this.state.counter - 1,
        });
      }
    }
  };

  render() {
    return this.state.list;
  }
}

export default LatteModalIngredientList;
