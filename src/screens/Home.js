import React, { useEffect, useState, useCallback, useRef } from "react";
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
  VirtualizedList,
  Image,
  Dimensions,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import Actions from "../redux/actions";

import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import AppRoutes from "../utils/app-routes";
import SimpsonItem from "../components/simpsonItem";
import Ionicons from "@expo/vector-icons/Ionicons";

const Home = ({ navigation }) => {
  const listRef = useRef();
  const simpsonsData = useSelector((state) => state.simpsonsReducer.simpsons);

  const getItemCount = useCallback(
    () => simpsonsData?.length,
    [simpsonsData?.length]
  );

  const lastIndex = simpsonsData?.length;

  const getItem = useCallback((data, index) => data[index], []);

  const renderItem = useCallback(
    ({ item, index }) => <SimpsonItem key={index} item={item} index={index} />,
    []
  );

  
  const addSimpson = useCallback(() => {
    navigation.push(AppRoutes.Main.childs.AddSimpson.name);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eee",
      }}
    >
      <VirtualizedList
        ref={listRef}
        // refreshControl={
        //   <RefreshControl refreshing={refreshLoading} onRefresh={refresh} />
        // }
        onContentSizeChange={() => listRef.current.scrollToEnd()}
        data={simpsonsData}
        initialNumToRender={4}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
        scrollToEnd={{ animated: true }}
        refreshing={true}
        testID={"simpson_list"}
      />

      <TouchableOpacity style={[styles.addBtn]} onPress={addSimpson}>
        <Ionicons name="add" size={34} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    width: 55,
    height: 55,
    backgroundColor: "#2E86DE",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 100
  },
});

export default Home;
