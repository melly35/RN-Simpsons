import React from "react";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import Actions from "../redux/actions";

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  dispatch(Actions.simpsonAction.getSimpsons());

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size={"large"} color={"blue"} />
    </SafeAreaView>
  );
};

export default SplashScreen;
