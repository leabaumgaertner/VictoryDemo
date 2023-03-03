import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { Text, View, Box, Pressable } from "native-base";
import { RootTabScreenProps } from "../types";

import { fakeAirQualityData } from "../assets/data/AirQualityData";
import AirQualityGraph from "../components/AirQualityGraph";

export default function TabFourScreen({
  navigation,
}: RootTabScreenProps<"TabFour">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>City Air Quality over Time</Text>
      <Box style={styles.controlsContainer}>
        <AirQualityGraph data={fakeAirQualityData} />
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  contentContainer: {
    flexGrow: 2,
  },
  controlsContainer: {
    paddingTop: 20,
    paddingHorizontal: 25,
    alignItems: "center",
    flexDirection: "row",
  },
});
