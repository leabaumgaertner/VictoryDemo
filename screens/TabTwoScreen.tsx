import { Easing, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

import { VictoryPie } from "victory-native";

import { Colors } from "../constants/Colors";
import { smallFakeBudgetData } from "../assets/data/SmallFakeBudgetData";
import { useEffect, useState } from "react";
import { RootTabScreenProps } from "../types";

type Data = {
  x: string;
  y: number;
};

const categories = [
  "Groceries",
  "Subscriptions",
  "Entertainment",
  "Meds",
  "Shopping",
  "Rent",
  "Extra Costs",
  "Wifi",
];

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const [graphicData, setGraphicData] = useState<Data[]>([]);
  const [endAngle, setEndAngle] = useState(0);

  const preprocessedData = () => {
    return smallFakeBudgetData.map((dataSet) => {
      return {
        x: dataSet.categorie,
        y: dataSet.amount,
      };
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", async (e) => {
      setTimeout(() => {
        setGraphicData(preprocessedData());
        setEndAngle(360);
      }, 100);
    });
    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget Overview</Text>
      <VictoryPie
        height={300}
        // cornerRadius={({ datum }) => datum.y * 5}
        // innerRadius={({ datum }) => datum.y * 20}
        animate={{
          duration: 2000,
        }}
        style={{
          labels: {
            paddingLeft: 30,
            // angle: -30,
          },
        }}
        categories={{ x: categories }}
        colorScale={[
          Colors.brown,
          Colors.purple,
          Colors.mustard,
          Colors.indigo,
          Colors.melon,
        ]}
        data={graphicData}
        innerRadius={50}
        endAngle={endAngle}
        events={[
          {
            target: "data",
            eventHandlers: {
              onPress: () => {
                return [
                  {
                    target: "data",
                    mutation: ({ style }) => {
                      return style.fill === "#c43a31"
                        ? null
                        : { style: { fill: "#c43a31" } };
                    },
                  },
                  {
                    target: "labels",
                    mutation: ({ data, text }) => {
                      return text === data.y ? null : { text: data.y };
                    },
                  },
                ];
              },
            },
          },
        ]}
      />
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
    paddingBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
