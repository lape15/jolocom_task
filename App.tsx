import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Animated,
  Platform,
  SafeAreaView
} from "react-native";
import Header from "./components/header/Header";
import Success from "./components/screens/Success";
import Failure from "./components/screens/Failure";
import Form from "./components/form/Form";

const initialState: Fields = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  age: "",
  isValid: false,
};

interface Fields {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  age: string;
  isValid: boolean;
}

export default function App() {
  const [showHeaderText, setShowHeaderText] = useState("");
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 9));
  const offset = useRef(new Animated.Value(1)).current;

  const [showScreen, setShowScreen] = useState("");

  const [fields, setFields] = useState(initialState);

  const updateFields = (name: string, text: string | number) => {
    setFields({
      ...fields,
      [name]: text,
      isValid: checkValidity(),
    });
  };

  const fadeAnim = useRef(new Animated.Value(-500)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: -700,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: Platform.OS === "android" ? 30 : 50,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    if (showScreen === "") {
      fadeOut();
    } else fadeIn();
  }, [showScreen]);

  function getFieldValue(key: keyof Fields) {
    return fields[key];
  }

  const checkValidity = () => {
    let valid = true;
    const objKeys = Object.keys(fields).slice(0, 5);
    for (let i = 0; i < objKeys.length; i += 1) {
      valid = getFieldValue(objKeys[i] as keyof Fields) !== "" && valid;
    }
    return valid;
  };

  const handleProfileSubmit = () => {
    if (randomNum / 2 === 0) return setShowScreen("success");
    setShowScreen("failure");
  };

  const clearProfileSubmit = () => {
    setShowScreen("");
    setFields(initialState);
    setRandomNum(Math.floor(Math.random() * 9));
  };

  // useEffect(() => {
  //   if (fields.isValid) handleProfileSubmit();
  // }, [fields.isValid]);

  return (
    
    <View style={styles.container}>
      <Header
        showHeaderText={showHeaderText}
        animatedValue={offset}
        showScreen={showScreen}
      />
      <Animated.ScrollView
        style={[
          styles.scrollView,
          {
            marginTop: showHeaderText ? 65 : 15,
            transform: [{ translateY: fadeAnim }],
          },
        ]}
        scrollEventThrottle={16}
        onScroll={(e) => {
          Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
            useNativeDriver: true,
          });
          if (e.nativeEvent.contentOffset.y <= 0) {
            setShowHeaderText("");
          } else {
            setShowHeaderText("Add your info");
          }
        }}
      >
        <KeyboardAvoidingView>
          <Form
            handleProfileSubmit={handleProfileSubmit}
            fields={fields}
            updateFields={updateFields}
            showScreen={showScreen}
            showHeaderText={showHeaderText}
          />
        </KeyboardAvoidingView>
      </Animated.ScrollView>
      <Failure
        clearProfileSubmit={clearProfileSubmit}
        showScreen={showScreen}
      />
      <Success
        clearProfileSubmit={clearProfileSubmit}
        showScreen={showScreen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    height: "100%",
    paddingTop: 10,
  },
  scrollView: {
    marginTop: 15,
    paddingVertical: 10,
    height: Platform.OS === "android" ? 700 : 600,
    position: "absolute",
    width: "100%",
    zIndex:5
  },
});
