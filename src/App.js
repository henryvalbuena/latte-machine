import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from "./containers/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateLatte from "./components/CreateLatte";
import Lattes from "./components/Lattes";
import Latte from "./components/Latte";
import User from "./components/User";

import styles from "./App.module.css";

function App() {
  let tmpLattes = [
    {
      name: "Moccha",
      ingredients: [
        {
          id: "01",
          color: "red",
          parts: 2,
        },
        {
          id: "02",
          color: "blue",
          parts: 1,
        },
        {
          id: "03",
          color: "orange",
          parts: 1,
        },
        {
          id: "04",
          color: "purple",
          parts: 1,
        },
        {
          id: "05",
          color: "yellow",
          parts: 1,
        },
      ]
    },
    {
      name: "Frapp",
      ingredients: [
        {
          id: "01",
          color: "brown",
          parts: 2,
        },
        {
          id: "02",
          color: "blue",
          parts: 1,
        },
        {
          id: "03",
          color: "black",
          parts: 1,
        },
        {
          id: "04",
          color: "purple",
          parts: 3,
        },
        {
          id: "05",
          color: "yellow",
          parts: 1,
        },
      ]
    },
    {
      name: "Unicorn Special",
      ingredients: [
        {
          id: "01",
          color: "purple",
          parts: 1,
        },
        {
          id: "02",
          color: "pink",
          parts: 1,
        },
        {
          id: "03",
          color: "white",
          parts: 2,
        },
        {
          id: "04",
          color: "red",
          parts: 1,
        },
        {
          id: "05",
          color: "orange",
          parts: 2,
        },
        {
          id: "06",
          color: "lightblue",
          parts: 2,
        },
      ]
    }
  ];
  let makeLattes = () => {
    let list = []
    for (let latte of tmpLattes)
      list.push(Latte(latte))
    return list;
  }

  let latteList = makeLattes();

  return (
    <Router>
      <div className={styles.body}>
        <Header />
        <Main>
          <Switch>
            <Route exact path="/drinks">
              <CreateLatte />
              <Lattes latteList={latteList} />
            </Route>
            <Route exact path="/user">
              <User />
            </Route>
          </Switch>
        </Main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
