import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
} from "react-native";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { useSelector, useDispatch } from "react-redux";
import Actions from "../redux/actions";
import FormInput from "../components/formInput";
import { useForm } from "react-hook-form";
import CustomBtn from "../components/CustomBtn";

const AddSimpson = ({ navigation }) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const IMAGE_URL_REGEX =
    /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onAddSimpson = useCallback((data) => {
    setDisabled(true);
    dispatch(Actions.simpsonAction.addSimpson(data));
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <KeyboardAwareScrollView
        style={{ flex: 1, alignSelf: "stretch" }} 
        behavior={Platform.OS === "ios" ? "padding" : ""}
        enabled
      >
        <View style={[{ flex: 1, alignSelf: "stretch" }]}>
          <FormInput
            name={"name_surname"}
            label={"Name Surname:"}
            control={control}
            rules={{
              required: "Name Surname Required",
              minLength: {
                value: 5,
                message: "Name Surname should be minimum 5 characters long.",
              },
              maxLength: {
                value: 30,
                message: "Name Surname should be max 30 characters",
              },
            }}
          />

          <FormInput
            name={"job_title"}
            label={"Job Title:"}
            control={control}
            rules={{
              required: "Job Title Required",
              minLength: {
                value: 5,
                message: "Job Title should be minimum 5 characters long.",
              },
              maxLength: {
                value: 30,
                message: "Job Title should be max 30 characters",
              },
            }}
          />

          <FormInput
            name={"about"}
            label={"About Him/Her:"}
            multiline
            control={control}
            rules={{
              required: "About Him/Her: Required",
              minLength: {
                value: 20,
                message: "About Him/Her: should be minimum 20 characters long.",
              },
              maxLength: {
                value: 600,
                message: "About Him/Her: should be maximum 600 characters ",
              },
            }}
          />

          <FormInput
            name={"image_url"}
            label={"Image Link:"}
            control={control}
            rules={{
              required: "Name Surname Required",
              pattern: {
                value: IMAGE_URL_REGEX,
                message: "Image Link is invalid",
              },
            }}
          />
          <CustomBtn
            onPress={handleSubmit(onAddSimpson)}
            text={"Add Character"}
            loading={disabled}
            disabled={disabled}
            testID={"add_character_tl"}
          />
        </View>
      </KeyboardAwareScrollView>
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
