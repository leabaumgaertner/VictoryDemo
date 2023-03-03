import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabFourScreen({
  navigation,
}: RootTabScreenProps<"Welcome">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the </Text>
      <Text style={styles.biggerTitle}> Victory Demo</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.smallSubTitle}>by Lea Baumgaertner</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  biggerTitle: {
    fontSize: 40,
    fontWeight: "bold",
  },
  smallSubTitle: {
    fontSize: 15,
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
