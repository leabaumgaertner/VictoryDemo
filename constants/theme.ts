import { extendTheme } from "native-base";
import { Platform } from "react-native";
import { Colors } from "./Colors";

export const theme = extendTheme({
  Radio: {
    baseStyle: {
      borderWidth: 1,
      borderColor: "transparent",
      p: "0px",
      alignSelf: "stretch",
      _icon: {
        display: "none",
      },
      _interactionBox: {
        display: "none",
      },
      _text: {
        pt: "15px",
        pb: "15px",
        ml: -1,
        color: Colors.melon,
        flexGrow: 1,
        textAlign: "center",
        ...Platform.select({
          ios: {
            fontFamily: "Montserrat",
            fontWeight: "200",
          },
          android: {
            fontFamily: "Montserrat-Medium",
            fontWeight: "200",
          },
        }),
      },
      _checked: {
        backgroundColor: Colors.mustard,
        _text: {
          borderWidth: 1,
          borderColor: Colors.brown,
          overflow: "hidden",
          borderRadius: 6,
          bg: Colors.mustard,
          ...Platform.select({
            ios: {
              fontFamily: "Montserrat-Medium",
              fontWeight: "700",
            },
            android: {
              fontFamily: "Montserrat",
              fontWeight: "600",
            },
          }),
        },
      },
    },
    variants: {
      short: {
        _text: {
          pt: "8px",
          pb: "8px",
        },
      },
    },
  },
});
