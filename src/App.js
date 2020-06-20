import React from "react";

import Main from "./containers/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateLatte from "./components/CreateLatte";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.body}>
      <Header />
      <Main>
        <CreateLatte />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
