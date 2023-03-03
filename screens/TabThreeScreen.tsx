import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

import { Colors } from "../constants/Colors";

import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryLabel,
} from "victory-native";

import { fakeStonksData } from "../assets/data/StonksData";
import { useEffect, useState } from "react";
import { RootTabScreenProps } from "../types";

interface StonksDataProps {
  timeStamp: string;
  value: number;
}

export default function TabThreeScreen({
  navigation,
}: RootTabScreenProps<"TabThree">) {
  const [graphicData, setGraphicData] = useState<StonksDataProps[]>([]);

  const stonksLabels = () => {
    return fakeStonksData.map((oneStonk) => oneStonk.value);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", async (e) => {
      setGraphicData(fakeStonksData);
    });
    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stonks</Text>
      <Text>2022-11-24</Text>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 10 }}
        style={{
          background: { fill: Colors.melon },
        }}
        containerComponent={<VictoryZoomContainer zoomDomain={{ x: [0, 6] }} />}
      >
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: Colors.brown },
            ticks: { stroke: Colors.brown },
            tickLabels: { fill: Colors.brown },
          }}
        />
        <VictoryAxis
          fixLabelOverlap={true}
          style={{
            axis: { stroke: Colors.brown },
            ticks: { stroke: Colors.brown },
            tickLabels: { fill: Colors.brown },
          }}
        />
        <VictoryLine
          animate={{
            duration: 3000,
          }}
          style={{
            data: { stroke: Colors.purple, strokeWidth: 3 },
            labels: { fill: Colors.brown },
          }}
          data={graphicData}
          x={(data) => data.timeStamp.slice(10)}
          y={(data) => data.value}
          interpolation="catmullRom"
          labels={stonksLabels()}
          labelComponent={<VictoryLabel dy={-40} />}
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
});
