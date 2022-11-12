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
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";
import AppRoutes from "../utils/app-routes";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../redux/actions";
import { Controller } from "react-hook-form";

const FormInput = ({
  control,
  name,
  label,
  secureTextEntry,
  rules = {},
  multiline = false,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={[styles.mainContainer]}>
          <Text style={[styles.label]}>{label}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={[
                styles.input,
                multiline && styles.multilineStyle,
                { borderColor: error ? "red" : "#ccc" },
              ]}
              secureTextEntry={secureTextEntry}
              multiline={multiline}
            />
          </View>
          {error && (
            <Text
              style={{
                color: "red",
                alignSelf: "stretch",
                marginHorizontal: 14,
              }}
            >
              {error.message || "Error"}
            </Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 6,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
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

export default FormInput;
