import React, { memo, PureComponent, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";
import AppRoutes from "../utils/app-routes";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../redux/actions";
import { Controller } from "react-hook-form";

const CustomBtn = ({ onPress, text, loading, disabled }) => {
  return (
    <TouchableOpacity style={[styles.button]} disabled={disabled} onPress={onPress} testID={'add_character'}>
      <View>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={'white'}
            style={{ marginRight: 3 }}
          />
        ) : (
          <Text style={[styles.buttonText]}>{text}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2e86de',
    paddingHorizontal: 40,
    paddingVertical: 16,
    margin: 10,
    borderRadius: 8,
  },

  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },

  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 6,
  },

  multilineStyle: {
    height: 200,
  },

  label: {
    alignSelf: "stretch",
    marginLeft: 14,
    fontSize: 16,
  },
});

export default CustomBtn;
