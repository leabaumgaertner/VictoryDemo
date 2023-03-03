import React, { useState, useEffect } from "react";
import { useWindowDimensions, StyleSheet, Platform, View } from "react-native";

import { Box, Text } from "native-base";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryZoomContainer,
} from "victory-native";

import { Defs, LinearGradient, Stop } from "react-native-svg";
import { Colors } from "../constants/Colors";

interface MeasuredAirQuality {
  time: string;
  airQuality: number;
}

interface AirQualityData {
  data: MeasuredAirQuality[];
}

const AirQualityGraph = ({ data }: AirQualityData) => {
  const { width } = useWindowDimensions();

  // This would be dynamic in the context of the data "current max air quality"
  const maxAirQualityValue = 180;

  const dynamicYValuesGradient = () => {
    let greenOffset;
    let yellowOffset;
    let blueOffset;

    // Thresholds for determining color changes
    let min = 50;
    let mid = 100;
    let max = 170;

    if (maxAirQualityValue <= mid) {
      greenOffset = "2%";
      blueOffset = "20%";
    } else if (maxAirQualityValue > min && maxAirQualityValue <= mid) {
      greenOffset = "40%";
      blueOffset = "90%";
    } else if (maxAirQualityValue > mid && maxAirQualityValue <= mid) {
      yellowOffset = "30%";
      greenOffset = "50%";
      blueOffset = "70%";
    } else if (maxAirQualityValue > mid && maxAirQualityValue <= max) {
      yellowOffset = "20%";
      greenOffset = "30%";
      blueOffset = "100%";
    } else if (maxAirQualityValue > max) {
      yellowOffset = "33%";
      greenOffset = "66%";
      blueOffset = "70%";
    }
    return (
      <Defs>
        <LinearGradient
          id="gradientStroke"
          x1={"50%"}
          y1={"0%"}
          x2={"50%"}
          y2={"100%"}
        >
          {maxAirQualityValue >= max ? (
            <Stop offset="0%" stopColor="#FF0000" />
          ) : (
            <></>
          )}
          {maxAirQualityValue >= mid ? (
            <Stop offset={yellowOffset} stopColor="#FFFF00" />
          ) : (
            <></>
          )}
          {maxAirQualityValue >= min && maxAirQualityValue < mid ? (
            <Stop offset={greenOffset} stopColor="#00FF00" />
          ) : (
            <></>
          )}
          <Stop offset={blueOffset} stopColor="#0E86D4" />
        </LinearGradient>
      </Defs>
    );
  };

  return (
    <Box style={styles.chartContainer}>
      <Text
        style={{
          ...styles.chartLabel,
        }}
      >
        Air Quality Level
      </Text>
      <VictoryChart
        width={width}
        height={300}
        domainPadding={{ x: 10, y: 20 }}
        containerComponent={<VictoryZoomContainer zoomDomain={{ x: [0, 6] }} />}
      >
        <VictoryAxis
          key={"xAxisForTimeValues"}
          offsetY={60}
          style={{
            grid: { stroke: "transparent" },
            axis: { stroke: Colors.brown },
            ticks: { stroke: "none" },
            tickLabels: { fill: Colors.brown },
          }}
          fixLabelOverlap={true}
        />
        {dynamicYValuesGradient()}
        <VictoryLine
          x={(data) => data.time.slice(5)}
          y={(data) => (data.airQuality === 0 ? null : data.airQuality)}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          data={data}
          interpolation="catmullRom"
          style={{
            data: {
              stroke: "url(#gradientStroke)",
              strokeWidth: 3,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          key={"yAxisForQualityValues"}
          offsetY={60}
          style={{
            grid: { stroke: "transparent" },
            axis: { stroke: Colors.brown },
            ticks: { stroke: "none" },
            tickLabels: { fill: Colors.brown },
          }}
          fixLabelOverlap={true}
        />
      </VictoryChart>
    </Box>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    position: "relative",
    marginLeft: 80,
  },
  chartLabel: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "black",
    marginLeft: -20,
  },
});

export default AirQualityGraph;
