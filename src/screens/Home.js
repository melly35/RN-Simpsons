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
  Dimensions
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import Actions from "../redux/actions";

import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import AppRoutes from "../utils/app-routes";
import SimpsonItem from "../components/simpsonItem";

const Home = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width
  const listRef = useRef();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const simpsonsData = useSelector((state) => state.simpsonsReducer.simpsons);
  
   

  const getItemCount = useCallback(
    () => simpsonsData?.length,
    [simpsonsData?.length]
  );

  const lastIndex = simpsonsData?.length

  const getItem = useCallback((data, index) => data[index], []);

  const renderItem = useCallback(({ item, index }) => <SimpsonItem key={index} item={item} index={index} />, []);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#eee' }}
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
      />
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

export default Home;
