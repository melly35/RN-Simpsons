import React, { memo, PureComponent, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";
import AppRoutes from "../utils/app-routes";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../redux/actions";

const SimpsonItem = ({ index, item }) => {
  const _width = Dimensions.get("window").width;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const lastIndex = useSelector((state) => state.simpsonsReducer.totalCount);

  const itemMoveUp = useCallback((id) => {
    dispatch(Actions.simpsonAction.moveUpSimpson({ simpsonId: id }));
  }, []);

  const itemMoveDown = useCallback((id) => {
    dispatch(Actions.simpsonAction.moveDownSimpson({ simpsonId: id }));
  }, []);

  const itemDelete = useCallback((id) => {
    dispatch(Actions.simpsonAction.removeSimpson({ simpsonId: id }));
  }, []);

  const goDetail = useCallback((item) => {
    navigation.push(AppRoutes.Main.childs.DetailSimpson.name, { item: item });
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      style={[styles.pContainer, { width: _width }]}
      key={item.id}
      onPress={() => goDetail(item)}
    >
      <View style={styles.flex}>
        <Text>{index + 1}</Text>
        <View style={[styles.imageContainer]}>
          <Image
            style={[styles.imageBox, {}]}
            source={{
              uri: item.avatar,
            }}
            resizeMode={"contain"}
          />
        </View>
        <Text>{item.name}</Text>
      </View>

      <View style={[styles.actionButtons]}>
        {index + 1 != 1 && (
          <TouchableOpacity
            style={[styles.actionButtonBox]}
            onPress={() => itemMoveUp(item.id)}
          >
            <Ionicons name="arrow-up-circle-outline" size={30} color="green" />
          </TouchableOpacity>
        )}

        {index + 1 != lastIndex && (
          <TouchableOpacity
            style={[styles.actionButtonBox]}
            onPress={() => itemMoveDown(item.id)}
          >
            <Ionicons name="arrow-down-circle-outline" size={30} color="red" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.actionButtonBox]}
          onPress={() => itemDelete(item.id)}
        >
          <Ionicons name="trash-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  pContainer: {
    backgroundColor: "white",
    alignItems: "center",
    alignSelf: "stretch",
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  imageContainer: {
    width: 50,
    height: 50,
    marginHorizontal: 6,
  },

  imageBox: {
    width: "100%",
    height: "100%",
  },

  actionButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    color: "#fff",
    textAlign: "center",
  },

  actionButtonBox: {
    marginHorizontal: 3,
  },
});

export default SimpsonItem;
