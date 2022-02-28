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
} from "react-native";
import Header from "./components/header/Header";
import InputBox from "./components/inputs/Input";

export default function App() {
  const [title, setTitle] = useState("");
  const firtName = useRef<null | { focus: Function }>(null);
  const lastName = useRef<null | { focus: Function }>(null);
  const phoneNumber = useRef<null | { focus: Function }>(null);
  const email = useRef<null | { focus: Function }>(null);
  const age = useRef<null | { focus: Function }>(null);
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 9)); // Move it in so it can change on every rerender.
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    age: "",
    isValid: false,
  });

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

  const moveToNextField = (name: string) => {
    if (name === "lasttName") return lastName.current?.focus();
    if (name === "phoneNumber") return phoneNumber.current?.focus();
    if (name === "email") return email.current?.focus();
    if (name === "age") return age.current?.focus();
    if (name === "age") return firtName.current?.focus();
  };
  const handleProfileSubmit = () => {
    setRandomNum(Math.floor(Math.random() * 9));
    if (randomNum / 2 === 0) return console.log("Sucess");
    console.log("Failure");
  };

  return (
    <ScrollView
      style={styles.container}
      scrollEventThrottle={16}
      // onScroll={(e) => console.log(e.nativeEvent)}
    >
      <KeyboardAvoidingView>
        <Header title="Add your info" />
        <View style={styles.textCon}>
          <Text style={styles.text}>
            To complete your profile please fill in all neccessary information
          </Text>
        </View>
        <View style={styles.view}>
          <InputBox
            value={fields.firstName}
            setValue={updateFields}
            name="firstName"
            placeholder="First name"
            keyboardType="default"
            refName="lastName"
            ref={firtName}
            moveToNextField={moveToNextField}
          />

          <InputBox
            value={fields.lastName}
            setValue={updateFields}
            name="lastName"
            placeholder="Last name"
            keyboardType="default"
            ref={lastName}
            refName="phoneNumber"
            moveToNextField={moveToNextField}
          />
          <InputBox
            value={fields.phoneNumber}
            setValue={updateFields}
            name="phoneNumber"
            keyboardType="numeric"
            placeholder="Phone number"
            ref={phoneNumber}
            refName="email"
            moveToNextField={moveToNextField}
          />
          <InputBox
            value={fields.email}
            setValue={updateFields}
            name="email"
            keyboardType="email-address"
            placeholder="Email"
            ref={email}
            refName="age"
            moveToNextField={moveToNextField}
          />
          <InputBox
            value={fields.age}
            setValue={updateFields}
            name="age"
            keyboardType="number-pad"
            placeholder="Age"
            ref={age}
            refName="firtName"
            moveToNextField={moveToNextField}
          />
          <View style={styles.btnView}>
            <TouchableOpacity
              onPress={handleProfileSubmit}
              style={{ ...styles.btn, ...(fields.isValid && { opacity: 1 }) }}
              activeOpacity={1}
              disabled={!fields.isValid}
            >
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    height: "100%",
    paddingTop: 130,
  },
  textCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 4,
  },
  text: {
    color: "grey",
    textAlign: "center",
  },
  view: {
    flex: 1,
    paddingTop: 20,
    marginHorizontal: 4,
    marginTop: 10,
    height: 1000,
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
