import { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from "react-native";

type Props = {
  clearProfileSubmit: Function;
  showScreen: string;
};
const Failure = ({ clearProfileSubmit, showScreen }: Props) => {
  const fadeAnim = useRef(new Animated.Value(700)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: true,
      delay: 500,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 700,
      duration: 4000,
      useNativeDriver: true,
      delay: 500,
    }).start();
  };

  useEffect(() => {
    if (showScreen === "failure") {
      fadeIn();
    } else fadeOut();
  }, []);
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: fadeAnim,
            },
          ],
        },
      ]}
      testID="failure"
    >
      <View>
        <View>
          <Text style={{ ...styles.text, fontSize: 25 }}>Oooopsy</Text>
          <Text
            style={{
              ...styles.text,
              fontSize: 35,
              color: "yellow",
              fontWeight: "900",
              marginTop: 5,
            }}
          >
            ╳
          </Text>
        </View>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia debitis
          ipsa temporibus suscipit, incidunt, fugit corporis molestiae, nisi
          dignissimos recusandae eum reiciendis? Doloribus rerum unde eaque
          voluptatibus minima assumenda suscipit?
        </Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => clearProfileSubmit()}>
        <Text style={styles.btnText}>Start over</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Failure;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    height: "100%",
    paddingTop: 30,
  },
  text: {
    textAlign: "center",
    color: "white",
    padding: 15,
    lineHeight: 25,
  },
  btn: {
    width: "100%",
    textAlign: "center",
    padding: 15,
    backgroundColor: "rgba(128,128,123,0.6)",
    color: "white",
    marginVertical: 20,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
