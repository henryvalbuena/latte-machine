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
      latteComponentList: [],
      latteComponentKeyCounter: 1,
      latteDataList: [],
    };
  }

  openModal = () => {
    this.setState({
      ...this.state,
      // latteDataList: [],
      isModalOpen: true,
    });
    console.log("isOpen", true);
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      latteDataList: [],
      isModalOpen: false,
    });
    console.log("isOpen", false);
  };

  editLatte = (id) => {
    console.log("edit latte id:", id);
    console.log("latteDataList", this.state.latteDataList)
    // let latteData = this.state.latteDataList.filter((x) => parseInt(x.id) === parseInt(id))[0];
    let latteData = this.state.latteDataList.filter((x) => {
      console.log("obj-x", x);
      console.log("id", id);
      return parseInt(x.id) === parseInt(id);
    });
    console.log("latteData Arr", latteData);
    console.log("latteData index 0", latteData[0]);
    this.setState({
      ...this.state,
      isModalOpen: true,
      latteDataList: latteData,
    });
    console.log("latteData:", latteData);
  };

  handleForm = (event) => {
    const newLatte = processForm(event.target);

    let list = [...this.state.latteComponentList];
    let dataList = [...this.state.latteDataList];
    let latteComponentKey = this.state.latteComponentKeyCounter;
    let isModalOpen = false;
    list.push(
      <Latte
        key={latteComponentKey}
        {...newLatte}
        edit={() => this.editLatte(latteComponentKey)}
      />
    );
    dataList.push({ ...newLatte, id: latteComponentKey });
    latteComponentKey++;
    this.setState({
      ...this.state,
      isModalOpen: isModalOpen,
      latteComponentList: list,
      latteDataList: dataList,
      latteComponentKeyCounter: latteComponentKey,
    });
    console.log("submitted");
    event.preventDefault();
  };

  render() {
    let renderModal = () => {
      if (this.state.isModalOpen)
        return (
          <LatteModal
            display={this.state.isModalOpen}
            latte={this.state.latteDataList}
            closeModal={this.closeModal}
            handleForm={this.handleForm}
          />
        );
    };
    return (
      <Router>
        <div className={styles.body}>
          <Header />
          <Main>
            <Switch>
              <Route exact path="/lattes">
                {renderModal()}
                <CreateLatte openModal={() => this.openModal} />
                <Lattes latteList={this.state.latteComponentList} />
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
