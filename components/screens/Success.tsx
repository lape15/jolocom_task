import { useRef, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";

type Props = {
  clearProfileSubmit: Function;
  showScreen: string;
};

const Success = ({ clearProfileSubmit, showScreen }: Props) => {
  const fadeAnim = useRef(new Animated.Value(800)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 120,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 800,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (showScreen === "success") {
      fadeIn();
    } else fadeOut();
  }, [showScreen]);

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
      testID="sucess"
    >
      <View>
        <View>
          <Text style={{ ...styles.text, fontSize: 25 }}>Sucess</Text>
          <Text style={{ ...styles.text, fontSize: 35, color: "pink" }}>✓</Text>
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

export default Success;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    height: "100%",
    paddingTop: 30,
    position: "absolute",
    width: "100%",
  },
  text: {
    textAlign: "center",
    color: "white",
  },

  btn: {
    width: "100%",
    textAlign: "center",
    padding: 20,
    backgroundColor: "#E75480",
    color: "white",
    opacity: 0.3,
  },
  btnText: {
    textAlign: "center",
    color: "white",
  },
});
