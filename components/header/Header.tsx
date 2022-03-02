import { StyleSheet, Text, View, Animated } from "react-native";
import { useRef } from "react";

type headerProp = {
  showHeaderText: number;
  animatedValue: any;
  showScreen: string;
};

const HEADER_EXPANDED_HEIGHT = 1;
const HEADER_COLLAPSED_HEIGHT = 0;

const Header = ({ showScreen, animatedValue }: headerProp) => {
  let AnimatedHeaderValue = new Animated.Value(0);
  const opacityVal = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const translateVal = animatedValue.interpolate({
    inputRange: [0, 70],
    outputRange: [70, 0],
    extrapolate: "clamp",
  });
  const heightVal = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });
  if (showScreen !== "") {
    return null;
  }
  return (
    <Animated.View
      style={[
        styles.view,
        {
          transform: [
            {
              translateY: translateVal,
            },
            {
              scale: heightVal,
            },
          ],
        },
      ]}
    >
      <Text style={styles.headText}>Add your info</Text>
      <Animated.View style={{ ...styles.textCon, opacity: opacityVal }}>
        <Text style={styles.text}>
          To complete your profile please fill in all neccessary information
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    width: "100%",
    backgroundColor: "black",
    marginTop: 5,
  },
  headText: {
    color: "white",
    fontSize: 30,
  },
  textCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 12,
    marginVertical: 5,
    width: "100%",
  },
  text: {
    color: "grey",
    textAlign: "center",
    width: "100%",
    paddingVertical: 30,
    overflow: "scroll",
  },
});
