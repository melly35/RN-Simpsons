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

import { persistor } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import Actions from "../redux/actions";

const AddSimpson = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>AddSimpson</Text>
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

export default AddSimpson;
