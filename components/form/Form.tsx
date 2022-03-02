import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import InputBox from "../inputs/Input";

type FormProps = {
  fields: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    age: string;
    isValid: boolean;
  };
  updateFields: Function;
  handleProfileSubmit: Function;
  showScreen: string;
};
const Form = (props: FormProps) => {
  const { fields, updateFields, handleProfileSubmit, showScreen } = props;
  const firstName = useRef<null | { focus: Function }>(null);
  const lastName = useRef<null | { focus: Function }>(null);
  const phoneNumber = useRef<null | { focus: Function }>(null);
  const email = useRef<null | { focus: Function }>(null);
  const age = useRef<null | { focus: Function }>(null);
  const btnRef = useRef<null | { focus: Function }>(null);

  const moveToNextField = (name: string) => {
    if (name === "firstName") return lastName.current?.focus();
    if (name === "lastName") return phoneNumber.current?.focus();
    if (name === "phoneNumber") return email.current?.focus();
    if (name === "email") return age.current?.focus();
    if (name === "age") return btnRef.current?.focus();
  };

  return (
    <Animated.View style={[styles.view]} testID="form">
      <InputBox
        value={fields.firstName}
        setValue={updateFields}
        name="firstName"
        placeholder="First name"
        keyboardType="default"
        refName="firstName"
        ref={firstName}
        moveToNextField={moveToNextField}
      />

      <InputBox
        value={fields.lastName}
        setValue={updateFields}
        name="lastName"
        placeholder="Last name"
        keyboardType="default"
        ref={lastName}
        refName="lastName"
        moveToNextField={moveToNextField}
      />
      <InputBox
        value={fields.phoneNumber}
        setValue={updateFields}
        name="phoneNumber"
        keyboardType="numeric"
        placeholder="Phone number"
        ref={phoneNumber}
        refName="phoneNumber"
        moveToNextField={moveToNextField}
      />
      <InputBox
        value={fields.email}
        setValue={updateFields}
        name="email"
        keyboardType="email-address"
        placeholder="Email"
        ref={email}
        refName="email"
        moveToNextField={moveToNextField}
      />
      <InputBox
        value={fields.age}
        setValue={updateFields}
        name="age"
        keyboardType="number-pad"
        placeholder="Age"
        ref={age}
        refName="fage"
        moveToNextField={moveToNextField}
      />
      <View style={styles.btnView}>
        <TouchableOpacity
          onPress={() => handleProfileSubmit()}
          style={{ ...styles.btn, ...(fields.isValid && { opacity: 1 }) }}
          activeOpacity={1}
          disabled={!fields.isValid}
          testID="submitInfo"
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 30,
    marginHorizontal: 4,
    marginTop: 25,
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

export default Form;
