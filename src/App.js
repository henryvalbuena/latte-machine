import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import processForm from "./helpers/processForm";
import getAuthToken from "./helpers/getAuthToken";
import isAuthorized from "./helpers/isAuthorized";
import { getLattes, postLattes } from "./services/apiService";

import Main from "./containers/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateLatte from "./components/CreateLatte";
import Lattes from "./components/Lattes";
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
      authToken: null,
      isAuthorized: false,
    };
  }

  async componentDidMount() {
    const token = getAuthToken();
    if (!this.state.authToken && token) {
      const lattes = await getLattes(token);

      console.log("LATTES FROM API", lattes);

      this.setState({
        ...this.state,
        authToken: token,
        isAuthorized: isAuthorized(token),
      });
    }
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
    let latteData = this.state.latteDataList.filter(
      (x) => parseInt(x.id) === parseInt(id)
    );
    this.setState({
      ...this.state,
      isEditMode: true,
      isModalOpen: true,
      latteToEdit: latteData[0],
    });
  };

  removeLatte = (id) => {
    let latteList = [...this.state.latteDataList];
    console.log("latteList", latteList);
    let index = latteList.findIndex((l) => parseInt(l.id) === parseInt(id));
    console.log("index", index);
    if (index >= 0) {
      latteList.splice(index, 1);
      this.setState({
        ...this.state,
        isEditMode: false,
        isModalOpen: false,
        latteDataList: latteList,
      });
    }
    console.log("removeLatte", id);
  };

  hangleLogout = () => {
    if (this.state.authToken)
      this.setState({
        ...this.state,
        authToken: null,
        isAuthorized: false,
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
      console.log("editted");
    } else {
      console.log("newLatt", newLatte);
      let latteComponentKey = this.state.latteComponentKeyCounter;
      dataList.push({ ...newLatte, id: latteComponentKey });
      latteComponentKey++;
      try {
        const post = postLattes(newLatte, this.state.authToken);
        post.then(res => console.log(res))
          .catch(err => console.log(err.message))
        this.setState({
          ...this.state,
          isModalOpen: false,
          isEditMode: false,
          latteDataList: dataList,
          latteComponentKeyCounter: latteComponentKey,
        });
        console.log("submitted");
      } catch (err) {
        console.log("POST ERR", err);
      }
    }
    event.preventDefault();
  };

  render() {
    const renderModal = () => {
      if (this.state.isModalOpen)
        return (
          <LatteModal
            display={this.state.isModalOpen}
            editMode={this.state.isEditMode}
            latte={this.state.latteToEdit}
            closeModal={this.closeModal}
            handleForm={this.handleForm}
            removeLatte={this.removeLatte}
          />
        );
    };

    const renderCreateLatte = () => {
      if (this.state.isAuthorized)
        return <CreateLatte openModal={() => this.openModal} />;
    };

    return (
      <Router>
        <div className={styles.body}>
          <Header />
          <Main>
            <Switch>
              <Route exact path="/lattes">
                {renderModal()}
                {renderCreateLatte()}
                <Lattes
                  latteList={this.state.latteDataList}
                  edit={this.editLatte}
                />
              </Route>
              <Route exact path="/user">
                <User
                  token={this.state.authToken}
                  hangleLogout={() => this.hangleLogout}
                />
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
