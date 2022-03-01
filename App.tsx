import { useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
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
import Header from "./components/header/Header";
import InputBox from "./components/inputs/Input";
import Success from "./components/screens/Success";
import Failure from "./components/screens/Failure";
import Form from "./components/form/Form";

const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  age: "",
  isValid: false,
};

export default function App() {
  const [title, setTitle] = useState("");
  const [showHeaderText, setShowHeaderText] = useState(0);
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

  const checkValidity = () => {
    let valid = true;
    valid = fields.firstName !== "" && valid;
    valid = fields.lastName !== "" && valid;
    valid = fields.phoneNumber !== "" && valid;
    valid = fields.email !== "" && valid;
    valid = fields.age !== "" && valid;
    return valid;
  };

  const handleProfileSubmit = () => {
    setRandomNum(Math.floor(Math.random() * 9));
    if (randomNum / 2 === 0) return setShowScreen("sucess");
    setShowScreen("failure");
  };

  const clearProfileSubmit = () => {
    setShowScreen("");
    setFields(initialState);
  };

  return (
    <View style={styles.container}>
      <Header showHeaderText={showHeaderText} animatedValue={offset} />
      {showScreen === "failure" ? (
        <Failure
          clearProfileSubmit={clearProfileSubmit}
          showScreen={showScreen}
        />
      ) : showScreen === "successs" ? (
        <Success
          clearProfileSubmit={clearProfileSubmit}
          showScreen={showScreen}
        />
      ) : (
        <Animated.ScrollView
          style={styles.scrollView}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: true }
          )}
        >
          <KeyboardAvoidingView>
            <Form
              handleProfileSubmit={handleProfileSubmit}
              fields={fields}
              updateFields={updateFields}
              showScreen={showScreen}
            />
          </KeyboardAvoidingView>
        </Animated.ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    height: "100%",
    paddingTop: 130,
  },
  scrollView: {
    // marginTop: 20,
    flex: 1,
    paddingVertical: 30,
    height: 800,
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
  },
  view: {
    flex: 1,
    paddingTop: 20,
    marginHorizontal: 4,
    marginTop: 10,
    height: 750,
  },
  btnView: {
    flex: 1,
    marginTop: 20,
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
