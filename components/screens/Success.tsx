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
  const fadeAnim = useRef(new Animated.Value(600)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: true,
      delay: 1000,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 600,
      duration: 2000,
      useNativeDriver: true,
      delay: 1000,
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
    flex: 1,
    backgroundColor: "#000",
    height: "100%",
    paddingTop: 150,
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
