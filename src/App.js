import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import processForm from "./helpers/processForm";
import getAuthToken from "./helpers/getAuthToken";
import isAuthorized from "./helpers/isAuthorized";
import {
  getLattes,
  postLattes,
  editLattes,
  deleteLattes,
} from "./services/apiService";

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
      latteToEdit: {},
      latteDataList: [],
      authToken: null,
      isAuthorized: false,
    };
  }

  async componentDidMount() {
    const token = getAuthToken();
    let auth = null;
    let dataList = [];
    try {
      const lattes = await getLattes(token);
      for (let latte of lattes.drinks) {
        dataList.push({
          id: latte.id,
          title: latte.title,
          ingredients: [...latte.ingredients],
        });
      }
    } catch (err) {
      console.log("Init err", err);
    }
    if (!this.state.authToken && token) {
      auth = isAuthorized(token);
    }
    this.setState({
      ...this.state,
      latteDataList: dataList,
      authToken: token,
      isAuthorized: auth,
    });
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
    if (!this.state.isAuthorized) return;
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
    if (this.state.isAuthorized) {
      let remove = deleteLattes(id, this.state.authToken);
      remove
        .then((res) => {
          let index = latteList.findIndex(
            (l) => parseInt(l.id) === parseInt(id)
          );
          latteList.splice(index, 1);
          this.setState({
            ...this.state,
            isEditMode: false,
            isModalOpen: false,
            latteDataList: latteList,
          });
        })
        .catch((err) => {
          console.log("REMOVE", err);
          this.setState({
            ...this.state,
            isEditMode: false,
            isModalOpen: false,
          });
        });
    } else {
      this.setState({
        ...this.state,
        isEditMode: false,
        isModalOpen: false,
      });
    }
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
    if (!this.state.isAuthorized) {
      event.preventDefault();
      this.setState({
        ...this.state,
        isModalOpen: false,
        isEditMode: false,
      });
      return;
    }
    const newLatte = processForm(event.target);
    let dataList = [...this.state.latteDataList];
    if (this.state.isEditMode) {
      const id = this.state.latteToEdit.id;
      let patch = editLattes(id, newLatte, this.state.authToken);
      patch.then((data) => {
        const latte = data.drinks[0];
        const updatedDataList = dataList.map((l) => {
          if (parseInt(l.id) === parseInt(id)) return latte;
          else return l;
        });
        this.setState({
          ...this.state,
          isModalOpen: false,
          isEditMode: false,
          latteDataList: updatedDataList,
        });
        console.log("editted");
      });
    } else {
      try {
        const post = postLattes(newLatte, this.state.authToken);
        post
          .then((data) => {
            const latte = data.drinks[0];
            dataList.push({
              ...latte,
            });
            this.setState({
              ...this.state,
              isModalOpen: false,
              isEditMode: false,
              latteDataList: dataList,
            });
          })
          .catch((err) => console.log("POST ERR", err));
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
