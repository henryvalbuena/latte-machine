import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import processForm from "./helpers/processForm";

import Main from "./containers/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateLatte from "./components/CreateLatte";
import Lattes from "./components/Lattes";
import Latte from "./components/Latte";
import User from "./components/User";
import LatteModal from "./components/LatteModal";

import styles from "./App.module.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      latteList: [],
      listKey: 1,
    };
  }

  openModal = () => {
    this.setState({
      ...this.state,
      isModalOpen: true,
    });
    console.log("isOpen", true);
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      isModalOpen: false,
    });
    console.log("isOpen", false);
  };

  handleForm = (event) => {
    const newLatte = processForm(event.target);

    let list = [...this.state.latteList];
    let incrementKey = this.state.listKey;
    let isModalOpen = false;
    list.push(<Latte key={++incrementKey} {...newLatte} />);
    this.setState({
      ...this.state,
      isModalOpen: isModalOpen,
      latteList: list,
      listKey: incrementKey,
    });
    console.log("submitted");
    event.preventDefault();
  };

  render() {
    return (
      <Router>
        <div className={styles.body}>
          <Header />
          <Main>
            <Switch>
              <Route exact path="/drinks">
                <CreateLatte openModal={() => this.openModal} />
                <Lattes latteList={this.state.latteList} />
                <LatteModal
                  display={this.state.isModalOpen}
                  closeModal={this.closeModal}
                  handleForm={this.handleForm}
                />
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
}

export default App;
