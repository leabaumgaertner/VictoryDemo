import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { View, Text, Box, Radio } from "native-base";

import { RootTabScreenProps } from "../types";

import { Colors } from "../constants/Colors";
import { fakeRunningData } from "../assets/data/RunningData";

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryZoomContainer,
} from "victory-native";

const generateDefaultData = () => {
  return fakeRunningData.map((oneSet) => {
    return { date: oneSet.date, km: 0 };
  });
};

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [timeRange, setTimeRange] = useState("day");

  const barLabels = () => {
    return fakeRunningData.map((oneSet) => oneSet.km);
  };

  const [graphicData, setGraphicData] = useState(generateDefaultData());

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", async (e) => {
      setGraphicData(fakeRunningData);
    });
    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Run!</Text>

      <Box style={styles.controlsContainer}></Box>

      <VictoryChart
        height={350}
        domain={{ y: [0, 30] }}
        domainPadding={{ x: 10 }}
        style={{
          background: { fill: "white" },
        }}
        containerComponent={<VictoryZoomContainer zoomDomain={{ x: [0, 6] }} />}
      >
        <VictoryAxis
          dependentAxis
          style={{
            grid: {
              stroke: Colors.melon,
              strokeWidth: 1,
            },
            axis: { stroke: Colors.melon },
            ticks: { stroke: Colors.brown },
            tickLabels: { fill: Colors.brown },
          }}
        />
        <VictoryAxis
          style={{
            axis: { stroke: Colors.brown },
            ticks: { stroke: "none" },
            tickLabels: { fill: Colors.brown },
          }}
          fixLabelOverlap={true}
        />
        <VictoryBar
          barRatio={2}
          barWidth={25}
          // cornerRadius={{ top: 5 }} // bottom: 10, topLeft: 8
          style={{
            data: { fill: Colors.purple },
            labels: { fill: "black" },
          }}
          data={graphicData}
          animate={{
            duration: 2000,
          }}
          y={(data) => data.km}
          x={(data) => data.date.slice(5)}
          labels={barLabels()}
          labelComponent={<VictoryLabel dy={-10} />}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    backgroundColor: Colors.melon,
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
  controlsContainer: {
    paddingTop: 20,
    paddingHorizontal: 25,
    alignItems: "center",
    color: "white",
  },
  radioGroup: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 6,
    color: "white",
  },
});
