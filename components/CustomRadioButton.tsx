import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Pressable, View, Text } from "native-base";

import { Colors } from "../constants/Colors";

type RadioButtonProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
};

export const CustomRadioButton: React.FC<RadioButtonProps> = ({
  label,
  isSelected,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={
          isSelected
            ? [styles.radioButtonBase, styles.selectedRadioButton]
            : [styles.radioButtonBase]
        }
      >
        <Text
          style={
            isSelected
              ? [styles.radioText, styles.selectedText]
              : [styles.radioText]
          }
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  radioButtonBase: {
    width: 100,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderRadius: 2,
    backgroundColor: "lightblue",
    borderColor: "blue",
  },
  selectedRadioButton: {
    backgroundColor: "blue",
  },
  radioText: {
    color: "blue",
  },
  selectedText: {
    color: "lightblue",
  },
});

export default CustomRadioButton;
