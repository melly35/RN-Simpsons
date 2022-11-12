import React, { useRef, useState, useEffect } from "react";
import { Text, View, StatusBar } from "react-native";

import { Provider, useSelector, useDispatch } from "react-redux";
import { store, persistor } from "./src/redux/store";

import RootNav from "./src/navigation/index";

import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle="dark-content" />
          <RootNav />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
