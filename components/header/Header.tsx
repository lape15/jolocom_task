import { StyleSheet, Text, View, Animated } from "react-native";
import { useRef } from "react";

type headerProp = {
  showHeaderText: number;
  animatedValue: any;
};

// const range = [-1, 0, 2, 0];
const Header = ({ showHeaderText, animatedValue }: headerProp) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const hey = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 900],
  });
  console.log({ hey }, "NATE GROWING");
  return (
    <View style={styles.view}>
      <Text style={styles.headText}>Add your info</Text>
      <Animated.View
        style={{
          ...styles.textCon,
          opacity: animatedValue.interpolate({
            inputRange: [0, 900],
            outputRange: [0, 1],
          }),
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headText: {
    color: "#fff",
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
