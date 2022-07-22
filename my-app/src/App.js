import React from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Adddata from "./components/AddData";
import Editdata from "./components/EditDatas";
import Home from "./components/Home";
import Navbar from "./components/Navbar";


const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Route exact path="/" component={() => <Home />} />
      <Route exact path="/add" component={() => <Adddata />} />
      <Route exact path="/edit/:id" component={() => <Editdata />} />
    </div>
  );
};
export default App;
