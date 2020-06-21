import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import processForm from "./helpers/processForm";

import Main from "./containers/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateLatte from "./components/CreateLatte";
import Lattes from "./components/Lattes";
// import Latte from "./components/Latte";
import User from "./components/User";
import LatteModal from "./components/LatteModal";

import styles from "./App.module.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isEditMode: false,
      latteComponentKeyCounter: 1,
      latteToEdit: {},
      latteDataList: [],
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
      isEditMode: false,
    });
    console.log("isOpen", false);
  };

  editLatte = (id) => {
    console.log("edit latte id:", id);
    console.log("latteDataList", this.state.latteDataList);
    let latteData = this.state.latteDataList.filter((x) => {
      console.log("obj-x", x);
      console.log("id", id);
      return parseInt(x.id) === parseInt(id);
    });
    console.log("latteData Arr", latteData);
    console.log("latteData index 0", latteData[0]);
    this.setState({
      ...this.state,
      isEditMode: true,
      isModalOpen: true,
      latteToEdit: latteData[0],
    });
  };

  handleForm = (event) => {
    const newLatte = processForm(event.target);
    let dataList = [...this.state.latteDataList];

    if (this.state.isEditMode) {
      console.log("editLatt", newLatte);
      const id = this.state.latteToEdit.id;
      let updatedDataList = dataList.map((l) => {
        if (parseInt(l.id) === parseInt(id)) {
          return { ...newLatte, id: id };
        }
        return l;
      });
      this.setState({
        ...this.state,
        isModalOpen: false,
        isEditMode: false,
        latteDataList: updatedDataList,
      });
      console.log("editted")
    } else {
      console.log("newLatt", newLatte);
      let latteComponentKey = this.state.latteComponentKeyCounter;
      dataList.push({ ...newLatte, id: latteComponentKey });
      latteComponentKey++;
      this.setState({
        ...this.state,
        isModalOpen: false,
        isEditMode: false,
        latteDataList: dataList,
        latteComponentKeyCounter: latteComponentKey,
      });
      console.log("submitted");
    }
    event.preventDefault();
  };

  render() {
    let renderModal = () => {
      if (this.state.isModalOpen)
        return (
          <LatteModal
            display={this.state.isModalOpen}
            editMode={this.state.isEditMode}
            latte={this.state.latteToEdit}
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
                <Lattes
                  latteList={this.state.latteDataList}
                  edit={this.editLatte}
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
