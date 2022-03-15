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
  const fadeAnim = useRef(new Animated.Value(900)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 150,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 900,
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
      testID="success"
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
    marginHorizontal: 20,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
