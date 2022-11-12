import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  RefreshControl,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Actions from "../redux/actions";

import { useIsFocused, useFocusEffect } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  dispatch(Actions.simpsonAction.getSimpsons())

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size={'large'} color={'blue'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
  },
});

export default SplashScreen;
