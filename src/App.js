import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import processForm from "./helpers/processForm";
import getAuthToken from "./helpers/getAuthToken";
import isAuthorized from "./services/isAuthorized";
import {
  getLattes,
  postLattes,
  editLattes,
  deleteLattes,
} from "./services/apiService";

import Main from "./containers/Main";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import CreateLatte from "./components/latte/CreateLatte";
import Lattes from "./components/latte/Lattes";
import User from "./components/user/User";
import LatteModal from "./components/modal/LatteModal";
import { Messages, MessageLevel } from "./components/user/Messages";

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
      userMessage: { render: false, message: null, level: null },
    };
  }

  async componentDidMount() {
    const token = getAuthToken();
    let auth = null;
    let dataList = [];
    let userMsg = { render: false };
    try {
      if (this.state.latteDataList.length === 0) {
        const lattes = await getLattes(token);
        for (let latte of lattes.drinks) {
          dataList.push({
            id: latte.id,
            title: latte.title,
            ingredients: [...latte.ingredients],
          });
        }
      }
    } catch (err) {
      const msg = err.response ? err.response.status : err.message;
      console.log(msg)
      userMsg = {
        render: true,
        message: msg,
        level: MessageLevel.error,
      };
    }
    if (token) {
      auth = isAuthorized(token);
    }
    this.setState({
      ...this.state,
      latteDataList: dataList,
      authToken: token,
      isAuthorized: auth,
      userMessage: userMsg,
    });
  }

  openModal = () => {
    this.setState({
      ...this.state,
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      isModalOpen: false,
      isEditMode: false,
    });
  };

  closeAlert = () => {
    this.setState({
      ...this.state,
      userMessage: { render: false },
    });
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
    if (this.state.isAuthorized && id !== null) {
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
          const msg = err.response ? err.response.status : err.message;
          this.setState({
            ...this.state,
            isEditMode: false,
            isModalOpen: false,
            userMessage: {
              render: true,
              message: msg,
              level: MessageLevel.error,
            },
          });
        });
    } else {
      this.setState({
        ...this.state,
        isEditMode: false,
        isModalOpen: false,
        userMessage: { render: false },
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
    event.preventDefault();
    if (!this.state.isAuthorized) {
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
          .catch((err) => {
            const msg = err.response ? err.response.status : err.message;
            this.setState({
              ...this.state,
              isModalOpen: false,
              isEditMode: false,
              userMessage: {
                render: true,
                message: msg,
                level: MessageLevel.error,
              },
            });
          });
      } catch (err) {
        this.setState({
          ...this.state,
          isModalOpen: false,
          isEditMode: false,
          userMessage: {
            render: true,
            message: err.response.status,
            level: MessageLevel.error,
          },
        });
      }
    }
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

    const renderUserMessage = () => {
      const msg = this.state.userMessage;
      if (msg.render) {
        return <Messages {...msg} close={() => this.closeAlert} />;
      }
    };

    return (
      <Router>
        <div className={styles.body}>
          <Header />
          <Main>
            <Switch>
              <Route exact path="/latte-machine">
                <Home />
              </Route>
              <Route exact path="/latte-machine/lattes">
                {renderUserMessage()}
                {renderModal()}
                {renderCreateLatte()}
                <Lattes
                  latteList={this.state.latteDataList}
                  edit={this.editLatte}
                />
              </Route>
              <Route exact path="/latte-machine/user">
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
