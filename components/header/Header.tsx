import { StyleSheet, Text, View, Animated } from "react-native";
import { useRef } from "react";

type headerProp = {
  showHeaderText: number;
  animatedValue: any;
};

const HEADER_EXPANDED_HEIGHT = 100;
const HEADER_COLLAPSED_HEIGHT = 60;

const Header = ({ showHeaderText, animatedValue }: headerProp) => {
  const hey = animatedValue.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
  });
  return (
    <View style={styles.view}>
      <Text style={styles.headText}>Add your info</Text>
      <Animated.View
        style={{
          ...styles.textCon,
          opacity: hey,
        }}
      >
        <Text style={styles.text}>
          To complete your profile please fill in all neccessary information
        </Text>
      </Animated.View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    justifyContent: "center",
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
    padding: 10,
    marginVertical: 5,
    width: "100%",
    height: 100,
  },
  text: {
    color: "grey",
    textAlign: "center",
    width: "100%",
    paddingVertical: 20,
    // backgroundColor: "yellow",
    overflow: "scroll",
  },
});
