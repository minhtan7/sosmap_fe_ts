import React from "react";

import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
