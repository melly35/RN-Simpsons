import React, { useEffect, useState, useCallback } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image } from "react-native";
import useParams from "../utils/hooks/use-params";

const DetailSimpson = ({ navigation }) => {
  const { item } = useParams();

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
    >
      <View style={[styles.imageContainer]}>
        <Image
          style={[styles.imageBox, {}]}
          source={{
            uri: item.avatar,
          }}
          resizeMode={"contain"}
        />
      </View>

      <Text style={[styles.title]}>{item.name}</Text>
      <Text style={[styles.jobTitle]}>{item.job}</Text>
      <Text style={[styles.description]}>{item.description}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 300,
    height: 300,
    marginHorizontal: 6,
    marginVertical: 20,
  },

  imageBox: {
    width: "100%",
    height: "100%",
  },

  title: {
    color: "#020202",
    marginTop: 10,
    marginBottom: 4,
    fontSize: 24,
    fontWeight: "600",
  },

  jobTitle: {
    color: "#808080",
    marginBottom: 10,
    fontSize: 18,
  },

  description: {
    color: "#808080",
    marginBottom: 10,
    fontSize: 17,
    padding: 16,
  },
});

export default DetailSimpson;
